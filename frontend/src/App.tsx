import { useState } from "react";
import ChatInput from "./components/ChatInput";
import ChatData from "./types/ChatData";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [botResponseLoading, setBotResponseLoading] = useState<boolean>(false);

  async function fetchData(message: string): Promise<string> {
    const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });
    const data = await response.json();
    return data.response;
  }

  // Modify the last bot message in the chat window, used for updating the bot response or showing an error message.
  function modifyLastBotMessage(message: string) {
    setChatData((prevChatData) => {
      const newChatData = [...prevChatData];
      const lastBotMessageIndex = newChatData.length - 1;
      newChatData[lastBotMessageIndex] = {
        ...newChatData[lastBotMessageIndex],
        message: message,
      };
      return newChatData;
    });
  }

  function handleSend(message: string) {
    setChatData((prevChatData) => [
      ...prevChatData,
      {
        id: prevChatData.length + 1,
        message: message,
        sender: "user",
      },
      // Let the user know that the bot is typing
      {
        id: prevChatData.length + 1,
        message: "Typing...",
        sender: "bot",
      },
    ]);
    // Call API here, simulate a delay of 2 seconds
    setBotResponseLoading(true);
    setTimeout(async () => {
      try {
        const data = await fetchData(message);
        // Replace the last "Typing..." message with the actual bot response
        modifyLastBotMessage(data);
      } catch (error) {
        // Replace the last "Typing..." message with the generic error message
        modifyLastBotMessage("An error occurred. Please try again.");
      } finally {
        setBotResponseLoading(false);
      }
    }, 1000);
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      role="main"
    >
      <h1 className="text-2xl font-bold text-center text-blue-400">
        Collective[i] Case Study By Manav
      </h1>
      <ChatWindow chatData={chatData} />
      <div className="mt-4 flex flex-col justify-center items-center fixed bottom-8 left-0 right-0">
        <ChatInput
          onSend={handleSend}
          botResponseLoading={botResponseLoading}
        />
      </div>
    </div>
  );
}
