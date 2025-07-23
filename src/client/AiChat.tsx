import { useEffect, useMemo, useRef, useState } from "react";
import InputBar from "@/components/InputBar";
import MessageArea from "@/components/MessageArea";
import { useAuth } from "@clerk/clerk-react";
import { useProjectStore } from "@/store/projectStore";
import { useParams } from "react-router";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api_base_url";
import type { Message } from "@/types/chat.types";
import { v4 as uuidv4 } from "uuid";

const AiChat = () => {
  const params = useParams();

  const chatType = params.chatType;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content:
        "Hello! I’m your AI business planning assistant. I’ll help you develop your business plan. What type of business are you planning to launch?",
      isUser: false,
      type: "message",
    },
  ]);

  const [currentMessage, setCurrentMessage] = useState("");
  const [checkpointId, setCheckpointId] = useState<string | null>(null);
  const [lastMsgs, setLastMsgs] = useState<Message[]>([]);

  const VITE_AI_BACKEND_URL = import.meta.env.VITE_AI_BACKEND;
  console.log(VITE_AI_BACKEND_URL);
  const { userId } = useAuth();
  const msgLoaded = useRef(false);
  const selectedProject = useProjectStore((state) => state.selectedProject);

  useEffect(() => {
    if (msgLoaded.current) {
      const last2Msg = messages.slice(-2);

        console.log("Saving last 2 messages to backend:", last2Msg);
        saveChatSession(last2Msg);
    }
  }, [msgLoaded.current,messages]);

  const saveChatSession = async (updatedMessages) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/chats/chat-session/save/${userId}/${selectedProject?._id}/${chatType}`,
        {
          content: updatedMessages,
        }
      );

      if (!response) {
        throw new Error("Failed to save chat session");
      }

      console.log("Chat session saved:", response);
    } catch (error) {
      console.error("Error saving chat session:", error);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/chats/${userId}/${selectedProject?._id}/${chatType}`
      );
      console.log("Chat history fetched:", response.data);
      return response.data; // return the actual data
    } catch (error) {
      console.error("Error fetching chat history:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadChatHistory = async () => {
      if (userId && selectedProject?._id && chatType) {
        const data = await fetchChatHistory(); // ⬅️ await it
        console.log("fetched data", data?.message_Data?.messages);

        if (data?.message_Data?.messages) {
          setMessages(data.message_Data.messages);
        }
      }
    };

    loadChatHistory();
  }, [userId, selectedProject?._id, chatType]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("messages", messages);
    const messageText = currentMessage.trim();
    if (!messageText) return;

    const userMessageId = uuidv4();
    const aiMessageId = uuidv4();

    // Add user message
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
      // ✅ Guard clause to prevent undefined values
      if (!userId || !selectedProject?._id || !chatType) {
        console.error("Missing required parameters for chat submission.");
        return;
      }

      let url = `${VITE_AI_BACKEND_URL}/chat_stream?message=${encodeURIComponent(
        messageText
      )}&clerk_id=${encodeURIComponent(userId)}&project_id=${encodeURIComponent(
        selectedProject?._id
      )}&chat_type=${encodeURIComponent(chatType)}`;
      if (checkpointId)
        url += `&checkpoint_id=${encodeURIComponent(checkpointId)}`;

      const eventSource = new EventSource(url);
      let streamedContent = "";

      eventSource.onmessage = (event) => {
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

            // Save full messages after AI has responded completely

            setMessages((prevMessages) => {
              const updatedMessages = prevMessages.map((msg) =>
                msg.id === aiMessageId
                  ? { ...msg, content: streamedContent, isLoading: false }
                  : msg
              );
              msgLoaded.current = true;
              // console.log("Saving full messages to backend:", updatedMessages);
              return updatedMessages;
            });

            msgLoaded.current = false;
            // console.log("Saving full messages to backend:", messages);

            // Save last 2 messages after state update
            // setTimeout(() => {
            //   const last2Msg = messages.slice(-2);

            //   console.log("Saving last 2 messages to backend:", last2Msg);
            //   saveChatSession(last2Msg);
            // }, 2500);
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
      console.error("Error setting up EventSource:", error);
    }
  };

  return (
    <div className="flex justify-center bg-gradient-to-br from-slate-50 to-gray-100 h-[calc(100vh-50px)] py-3 px-4">
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
