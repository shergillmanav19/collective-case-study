import { useEffect, useRef } from "react";
import ChatData from "../types/ChatData";

type ChatWindowProps = {
  chatData: ChatData[];
};

export default function ChatWindow({ chatData }: ChatWindowProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatData]);

  return (
    <div
      ref={chatContainerRef}
      className="flex flex-col gap-4 w-full h-[70vh] overflow-y-auto mb-6 md:max-w-3xl"
      role="log"
      aria-live="polite"
      aria-relevant="additions"
    >
      <div role="list">
        {chatData.map((chat, index) => (
          <div
            key={`${chat.id}_${index}}`}
            className={`flex ${
              chat.sender === "user" ? "justify-end" : "justify-start"
            }`}
            role="listitem"
            tabIndex={0}
          >
            <div
              className={`flex flex-col gap-1 px-4 py-2 max-w-xs rounded-lg text-wrap
              ${
                chat.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <p aria-label={chat.message}>{chat.message}</p>
              {/* Display the sender */}
              {chat.sender === "user" ? (
                <small className="text-slate-200">You</small>
              ) : (
                <small className="text-gray-400">Bot</small>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
