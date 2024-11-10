interface ChatData {
  id: number;
  sender: "user" | "bot";
  message: string;
}

export default ChatData;
