import { render, screen, fireEvent } from "@testing-library/react";

import { Input, FormikInput } from "./Input";

describe("Input", () => {
  const mockSetValue = jest.fn();

  it("renders input with title and value", () => {
    render(
      <Input
        value="Test Value"
        type="text"
        title="Test Title"
        setValue={mockSetValue}
      />
    );
    const inputElement = screen.getByDisplayValue("Test Value");
    const titleElement = screen.getByText("Test Title");
    expect(inputElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });

  it("calls setValue when input value changes", () => {
    render(
      <Input
        value="Test Value"
        type="text"
        title="Test Title"
        setValue={mockSetValue}
      />
    );
    const inputElement = screen.getByDisplayValue("Test Value");
    fireEvent.change(inputElement, { target: { value: "New Value" } });
    expect(mockSetValue).toHaveBeenCalledWith("New Value");
  });
});

describe("FormikInput", () => {
  const mockOnChange = jest.fn();
  const mockOnBlur = jest.fn();

  it("renders input with title and value", () => {
    render(
      <FormikInput
        type="text"
        value="Test Value"
        name="testName"
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        title="Test Title"
      />
    );
    const inputElement = screen.getByDisplayValue("Test Value");
    const titleElement = screen.getByText("Test Title");
    expect(inputElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    render(
      <FormikInput
        type="text"
        value="Test Value"
        name="testName"
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        title="Test Title"
      />
    );
    const inputElement = screen.getByDisplayValue("Test Value");
    fireEvent.change(inputElement, { target: { value: "New Value" } });
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("calls onBlur when input loses focus", () => {
    render(
      <FormikInput
        type="text"
        value="Test Value"
        name="testName"
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        title="Test Title"
      />
    );
    const inputElement = screen.getByDisplayValue("Test Value");
    fireEvent.blur(inputElement);
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it("toggles between password and text type when eye icon is clicked", () => {
    render(
      <FormikInput
        type="password"
        value="Test Value"
        name="testName"
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        title="Test Title"
      />
    );
    const eyeIconElement = screen.getByTestId("eye-icon");
    const inputElement = screen.getByDisplayValue("Test Value");

    expect(eyeIconElement).toHaveClass("show");
    expect(eyeIconElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "password");

    fireEvent.click(eyeIconElement);
    const eyeIconElementTwo = screen.getByTestId("eye-icon");

    expect(eyeIconElementTwo).toBeInTheDocument();
    expect(eyeIconElement).not.toBeInTheDocument();
    expect(eyeIconElementTwo).toHaveClass("hide");
    expect(inputElement).toHaveAttribute("type", "text");

    fireEvent.click(eyeIconElementTwo);
    const eyeIconElementThree = screen.getByTestId("eye-icon");

    expect(eyeIconElementThree).toBeInTheDocument();
    expect(eyeIconElementThree).toHaveClass("show");
    expect(inputElement).toHaveAttribute("type", "password");
  });
});
