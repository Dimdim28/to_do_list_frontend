import { render, screen, fireEvent } from "@testing-library/react";

import Button from "./Button";

describe("Button", () => {
  const mockCallback = jest.fn();

  it("renders button with text", () => {
    render(<Button text="Click me" class="primary" callback={mockCallback} />);
    const buttonElement = screen.getByText("Click me");
    expect(buttonElement).toBeInTheDocument();
  });

  it("applies the correct CSS class", () => {
    render(<Button text="Click me" class="primary" callback={mockCallback} />);
    const buttonElement = screen.getByText("Click me");
    expect(buttonElement).toHaveClass("button");
    expect(buttonElement).toHaveClass("primary");
  });

  it("calls the callback function when clicked", () => {
    render(<Button text="Click me" class="primary" callback={mockCallback} />);
    const buttonElement = screen.getByText("Click me");
    fireEvent.click(buttonElement);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
