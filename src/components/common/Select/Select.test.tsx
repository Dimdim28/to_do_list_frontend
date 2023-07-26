import { render, screen, fireEvent } from "@testing-library/react";

import Select, { Item } from "./Select";

describe("Select", () => {
  const mockItems: Item<string>[] = [
    { name: "Option 1", value: "option1" },
    { name: "Option 2", value: "option2" },
    { name: "Option 3", value: "option3" },
  ];

  const mockCallback = jest.fn();

  it("renders select options when clicked", () => {
    render(
      <Select
        items={mockItems}
        activeValue="Option 1"
        callback={mockCallback}
        width="200px"
      />
    );

    const selectElement = screen.getByTestId("select-button");
    fireEvent.click(selectElement);

    const option1Element = screen.getByTestId("option-1");
    expect(option1Element).toBeInTheDocument();

    const option2Element = screen.getByTestId("option-2");
    expect(option2Element).toBeInTheDocument();

    const option3Element = screen.getByTestId("option-3");
    expect(option3Element).toBeInTheDocument();
  });

  it("calls callback function with selected value", () => {
    render(
      <Select
        items={mockItems}
        activeValue="Option 1"
        callback={mockCallback}
        width="200px"
      />
    );

    const selectElement = screen.getByTestId("select-button");
    fireEvent.click(selectElement);

    const option2Element = screen.getByTestId("option-2");
    fireEvent.click(option2Element);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith("option2");
  });

  it("updates active name when an option is selected", () => {
    render(
      <Select
        items={mockItems}
        activeValue="Option 1"
        callback={mockCallback}
        width="200px"
      />
    );

    const selectElement = screen.getByTestId("select-button");
    fireEvent.click(selectElement);

    const option3Element = screen.getByTestId("option-3");
    fireEvent.click(option3Element);

    const activeNameElement = screen.getByText("Option 3");
    expect(activeNameElement).toBeInTheDocument();
  });

  it("closes the options when an option is selected", () => {
    render(
      <Select
        items={mockItems}
        activeValue="Option 1"
        callback={mockCallback}
        width="200px"
      />
    );

    const selectElement = screen.getByTestId("select-button");
    fireEvent.click(selectElement);

    const option2Element = screen.getByTestId("option-2");
    fireEvent.click(option2Element);

    const option3Element = screen.queryByTestId("option-3");
    expect(option3Element).not.toBeInTheDocument();
  });
});
