import { useState } from "react";
import InputBar from "@/components/InputBar";
import MessageArea from "@/components/MessageArea";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  type: string;
  isLoading?: boolean;
}

const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content:'Hi there, tell me something about your business and I will help you with that?',
      isUser: false,
      type: 'message',
    },
  ]);

  const [currentMessage, setCurrentMessage] = useState("");
  const [checkpointId, setCheckpointId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("messages", messages);
    const messageText = currentMessage.trim();
    if (!messageText) return;

    const userMessageId = messages.length + 1;
    const aiMessageId = userMessageId + 1;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: userMessageId, content: messageText, isUser: true, type: "message" },
      { id: aiMessageId, content: "", isUser: false, type: "message", isLoading: true },
    ]);

    setCurrentMessage("");

    try {
      let url = `http://192.168.1.10:8000/chat_stream?message=${encodeURIComponent(messageText)}`;
      if (checkpointId) url += `&checkpoint_id=${encodeURIComponent(checkpointId)}`;

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
                msg.id === aiMessageId ? { ...msg, content: streamedContent, isLoading: false } : msg
              )
            );
          } else if (data.type === "end") {
            eventSource.close();
          }
        } catch (error) {
          console.error("Invalid SSE content:", event.data,error);
        }
      };

      eventSource.onerror = (err) => {
        console.error("SSE Error:", err);
        eventSource.close();
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? { ...msg, content: "⚠️ Error while processing response.", isLoading: false }
              : msg
          )
        );
      };
    } catch (error) {
      console.error("Error setting up EventSource:", error);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 h-[calc(100vh-120px)] py-2 px-4">
      <div className="w-[70%] bg-white flex flex-col rounded-xl h-full shadow-lg border border-gray-100 overflow-hidden">
        <MessageArea messages={messages} />
        <InputBar
          currentMessage={currentMessage}
          setCurrentMessage={setCurrentMessage}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AiChat;
