import { useCallback, useEffect, useRef, useState } from "react";
import InputBar from "@/components/InputBar";
import MessageArea from "@/components/MessageArea";
import { useAuth } from "@clerk/clerk-react";
import { useProjectStore } from "@/store/projectStore";
import { useParams } from "react-router"; // ❗use react-router-dom for hook type safety
import axios from "axios";
import { NODE_API_BASE_URL } from "@/lib/api_base_url";
import type { ChatHistoryResponse, Message } from "@/types/chat.types";
import { v4 as uuidv4 } from "uuid";

type ParamsType = Record<string, string | undefined>;

const AiChat = () => {
  const { chatType } = useParams<ParamsType>();
  const { userId } = useAuth();
  const selectedProject = useProjectStore((state) => state.selectedProject);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content:
        "Hello! I’m your AI business planning assistant. I’ll help you develop your business plan. What type of business are you planning to launch?",
      isUser: false,
      type: "message",
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [checkpointId, setCheckpointId] = useState<string | null>(null);
  const msgLoaded = useRef(false);

  const VITE_AI_BACKEND_URL = import.meta.env.VITE_AI_BACKEND;

  // 🧠 Save chat session to DB
  const saveChatSession = useCallback(
    async (updatedMessages: Message[]) => {
      console.log("✅ Saving chat session...");
      if (!userId || !selectedProject?._id || !chatType) return;

      try {
        const response = await axios.post(
          `${NODE_API_BASE_URL}/chats/chat-session/save/${userId}/${selectedProject._id}/${chatType}`,
          {
            content: updatedMessages,
          }
        );
        console.log("Chat session saved:", response.data);
      } catch (error) {
        console.error("Error saving chat session:", error);
      }
    },
    [userId, selectedProject?._id, chatType]
  );

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!userId || !selectedProject?._id || !chatType) return;

      try {
        const response = await axios.get<ChatHistoryResponse>(
          `${NODE_API_BASE_URL}/chats/${userId}/${selectedProject._id}/${chatType}`
        );
        const data = response.data;

        if (data?.message_Data?.messages) {
          setMessages(data.message_Data.messages);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [userId, selectedProject?._id, chatType]);

  useEffect(() => {
    if (msgLoaded.current) {
      const last2 = messages.slice(-2);
      saveChatSession(last2);
      msgLoaded.current = false; // reset after saving
    }
  }, [messages, saveChatSession]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const messageText = currentMessage.trim();
    if (!messageText || !userId || !selectedProject?._id || !chatType) return;

    const userMessageId = uuidv4();
    const aiMessageId = uuidv4();

    setMessages((prev) => [
      ...prev,
      {
        id: userMessageId,
        content: messageText,
        isUser: true,
        type: "message",
      },
      {
        id: aiMessageId,
        content: "",
        isUser: false,
        type: "message",
        isLoading: true,
      },
    ]);

    setCurrentMessage("");

    try {
      let url = `${VITE_AI_BACKEND_URL}/chat_stream?message=${encodeURIComponent(
        messageText
      )}&clerk_id=${encodeURIComponent(userId)}&project_id=${encodeURIComponent(
        selectedProject._id
      )}&chat_type=${encodeURIComponent(chatType)}`;

      if (checkpointId) {
        url += `&checkpoint_id=${encodeURIComponent(checkpointId)}`;
      }

      const eventSource = new EventSource(url);
      let streamedContent = "";

      eventSource.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "checkpoint") {
            setCheckpointId(data.checkpoint_id);
          } else if (data.type === "content") {
            streamedContent += data.content;

            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiMessageId
                  ? { ...msg, content: streamedContent, isLoading: false }
                  : msg
              )
            );
          } else if (data.type === "end") {
            eventSource.close();

            setMessages((prevMessages) => {
              const updatedMessages = prevMessages.map((msg) =>
                msg.id === aiMessageId
                  ? { ...msg, content: streamedContent, isLoading: false }
                  : msg
              );
              msgLoaded.current = true;
              return updatedMessages;
            });
          }
        } catch (error) {
          console.error("Invalid SSE content:", event.data, error);
        }
      };

      eventSource.onerror = (err) => {
        console.error("SSE Error:", err);
        eventSource.close();
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? {
                  ...msg,
                  content: "⚠️ Error while processing response.",
                  isLoading: false,
                }
              : msg
          )
        );
      };
    } catch (error) {
      console.error("Error in EventSource setup:", error);
    }
  };

  return (
    <div className="flex justify-center bg-gradient-to-br from-slate-50 to-gray-100 h-[calc(100vh-100px)] py-1 px-4 my-1">
      <div className="w-full bg-white/80 backdrop-blur-sm flex flex-col rounded-2xl h-full shadow-xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <MessageArea messages={messages} />

        {!selectedProject ? (
          <div className="text-center text-sm bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl px-6 py-3 mx-4 mb-4 shadow-lg backdrop-blur-sm border border-violet-300/30 font-medium">
            Please select a project to continue
          </div>
        ) : (
          <InputBar
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default AiChat;
