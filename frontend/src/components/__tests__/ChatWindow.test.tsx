import { render, screen } from "@testing-library/react";
import ChatWindow from "../ChatWindow";
import ChatData from "../../types/ChatData";

describe("ChatWindow Component", () => {
  const mockChatData: ChatData[] = [
    { id: 1, sender: "user", message: "Hello, Bot!" },
    { id: 2, sender: "bot", message: "Hello, User!" },
    { id: 3, sender: "user", message: "How are you?" },
  ];

  // Mock the scrollTo function before each test
  beforeEach(() => {
    HTMLElement.prototype.scrollTo = jest.fn();
  });

  test("renders chat messages correctly", () => {
    render(<ChatWindow chatData={mockChatData} />);

    // Check that each message is rendered
    expect(screen.getByText("Hello, Bot!")).toBeInTheDocument();
    expect(screen.getByText("Hello, User!")).toBeInTheDocument();
    expect(screen.getByText("How are you?")).toBeInTheDocument();
  });

  test("displays correct sender label for user and bot", () => {
    render(<ChatWindow chatData={mockChatData} />);

    expect(screen.getAllByText("You")).toHaveLength(2); // User messages
    expect(screen.getAllByText("Bot")).toHaveLength(1); // Bot message
  });

  test("scrolls to the bottom when new chat data is added", () => {
    const { rerender } = render(<ChatWindow chatData={[mockChatData[0]]} />);
    const chatContainer = screen.getByRole("region");

    // Mock scrollTo function to verify it was called
    chatContainer.scrollTo = jest.fn();

    // Add more chat data and rerender
    rerender(<ChatWindow chatData={mockChatData} />);

    expect(chatContainer.scrollTo).toHaveBeenCalledWith({
      top: chatContainer.scrollHeight,
      behavior: "smooth",
    });
  });
});
