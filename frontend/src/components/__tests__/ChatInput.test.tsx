import { render, screen, fireEvent } from "@testing-library/react";
import ChatInput from "../ChatInput";

// Mock function for onSend
const mockOnSend = jest.fn();

describe("ChatInput Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input and button", () => {
    render(<ChatInput onSend={mockOnSend} botResponseLoading={false} />);

    const input: HTMLInputElement =
      screen.getByPlaceholderText("Type a message...");
    const button: HTMLButtonElement = screen.getByRole("button", {
      name: /send/i,
    });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("updates input value on typing", () => {
    render(<ChatInput onSend={mockOnSend} botResponseLoading={false} />);

    const input: HTMLInputElement =
      screen.getByPlaceholderText("Type a message...");
    fireEvent.change(input, { target: { value: "Hello, world!" } });

    expect(input.value).toBe("Hello, world!");
  });

  test("calls onSend with message and clears input on submit", () => {
    render(<ChatInput onSend={mockOnSend} botResponseLoading={false} />);

    const input: HTMLInputElement =
      screen.getByPlaceholderText("Type a message...");
    const button: HTMLButtonElement = screen.getByRole("button", {
      name: /send/i,
    });

    fireEvent.change(input, { target: { value: "Test message" } });
    fireEvent.click(button);

    expect(mockOnSend).toHaveBeenCalledWith("Test message");
    expect(input.value).toBe("");
  });

  test("disables send button when botResponseLoading is true", () => {
    render(<ChatInput onSend={mockOnSend} botResponseLoading={true} />);

    const button: HTMLButtonElement = screen.getByRole("button", {
      name: /send/i,
    });

    expect(button).toBeDisabled();
  });

  test("disables send button when input is empty", () => {
    render(<ChatInput onSend={mockOnSend} botResponseLoading={false} />);

    const button: HTMLButtonElement = screen.getByRole("button", {
      name: /send/i,
    });

    expect(button).toBeDisabled();
  });

  test("enables send button when input is not empty and botResponseLoading is false", () => {
    render(<ChatInput onSend={mockOnSend} botResponseLoading={false} />);

    const input: HTMLInputElement =
      screen.getByPlaceholderText("Type a message...");
    const button: HTMLButtonElement = screen.getByRole("button", {
      name: /send/i,
    });

    fireEvent.change(input, { target: { value: "Valid input" } });

    expect(button).toBeEnabled();
  });
});
