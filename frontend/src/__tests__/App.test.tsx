import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";

// Mock fetch for API calls
jest.spyOn(window, "fetch");

describe("App Component", () => {
  beforeEach(() => {
    // Mock scrollTo function
    HTMLElement.prototype.scrollTo = jest.fn();
  });

  test("renders chat window and input components", () => {
    render(<App />);

    // Check for heading
    expect(
      screen.getByText(/Collective\[i\] Case Study By Manav/i)
    ).toBeInTheDocument();

    // Check for input placeholder
    expect(
      screen.getByPlaceholderText("Type a message...")
    ).toBeInTheDocument();
  });

  test("adds user message and bot typing indicator", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Type a message...");
    const sendButton = screen.getByRole("button", { name: /send/i });

    // Type and send a message
    fireEvent.change(input, { target: { value: "Hello, Bot!" } });
    fireEvent.click(sendButton);

    // Check if user message appears
    expect(screen.getByText("Hello, Bot!")).toBeInTheDocument();

    // Check for bot typing indicator
    expect(screen.getByText("Typing...")).toBeInTheDocument();
  });

  test("adds bot response after user message", async () => {
    // mock fetchData function
    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve({ response: "Hello, User!" }),
    });

    render(<App />);

    const input = screen.getByPlaceholderText("Type a message...");
    const sendButton = screen.getByRole("button", { name: /send/i });

    // Type and send a message
    fireEvent.change(input, { target: { value: "Hello, Bot!" } });
    fireEvent.click(sendButton);

    // Wait for bot response
    await waitFor(
      () => {
        expect(screen.getByText("Hello, User!")).toBeInTheDocument();
      },
      { timeout: 2500 }
    );
  });
});
