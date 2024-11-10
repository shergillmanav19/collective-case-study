import { useState } from "react";

type ChatInputProps = {
  onSend: (input: string) => void;
  botResponseLoading: boolean;
};

export default function ChatInput({
  onSend,
  botResponseLoading,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    onSend(message);
    setMessage("");
  }

  return (
    <form
      onSubmit={handleSend}
      className="flex justify-between w-full p-4 bg-white border-t border-gray-200 md:max-w-3xl"
    >
      <label htmlFor="message" className="sr-only">
        Message
      </label>
      <input
        id="message"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 text-gray-700 bg-gray-200 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-500"
      />
      <button
        type="submit"
        className="p-2 ml-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:opacity-50"
        disabled={botResponseLoading}
      >
        Send
      </button>
    </form>
  );
}
