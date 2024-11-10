import ChatData from "../types/ChatData";

type ChatWindowProps = {
  chatData: ChatData[];
};

export default function ChatWindow({ chatData }: ChatWindowProps) {
  return (
    <div className="flex flex-col gap-4 w-full h-[70vh] overflow-y-auto mb-6 md:max-w-3xl">
      {chatData.map((chat) => (
        <div
          key={chat.id}
          className={`flex ${
            chat.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex flex-col gap-1 px-4 py-2 max-w-xs rounded-lg text-wrap
              ${
                chat.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
          >
            <p>{chat.message}</p>
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
  );
}
