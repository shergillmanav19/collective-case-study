import { useState } from "react";
import ChatInput from "./components/ChatInput";
import ChatData from "./types/ChatData";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [botResponseLoading, setBotResponseLoading] = useState<boolean>(false);

  const handleSend = (message: string) => {
    setChatData((prevChatData) => [
      ...prevChatData,
      {
        id: prevChatData.length + 1,
        message: message,
        sender: "user",
      },
    ]);

    // Simulate bot response
    setBotResponseLoading(true);
    setTimeout(() => {
      setChatData((prevChatData) => [
        ...prevChatData,
        {
          id: prevChatData.length + 1,
          message: "Hello, I am a bot.",
          sender: "bot",
        },
      ]);
      setBotResponseLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold text-center text-blue-400">
        Collective[i] Case Study By Manav
      </h1>
      <ChatWindow chatData={chatData} />
      <div className="mt-4 flex flex-col justify-center items-center fixed bottom-8 left-0 right-0">
        <div className="text-gray-700">
          {botResponseLoading ? "Bot is typing..." : ""}
        </div>
        <ChatInput
          onSend={handleSend}
          botResponseLoading={botResponseLoading}
        />
      </div>
    </div>
  );
}
