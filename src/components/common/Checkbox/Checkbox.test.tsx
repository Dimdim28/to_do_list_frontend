import { render, screen, fireEvent } from "@testing-library/react";

import { Checkbox } from "./Checkbox";

import taskAPI from "../../../api/taskAPI";

jest.mock("../../../api/taskAPI");

describe("Checkbox", () => {
  const mockSetIsChecked = jest.fn();

  beforeEach(() => {
    taskAPI.edittask = jest.fn().mockImplementation(async () => {
      return {
        status: "success",
        _id: "task-123",
        isCompleted: true,
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders checkbox with label", () => {
    render(
      <Checkbox
        isChecked={false}
        setIsChecked={mockSetIsChecked}
        label="Check me"
      />
    );
    const checkboxElement = screen.getByLabelText("Check me");
    expect(checkboxElement).toBeInTheDocument();
  });

  it("calls setIsChecked when checkbox is clicked", () => {
    render(
      <Checkbox
        isChecked={false}
        setIsChecked={mockSetIsChecked}
        label="Check me"
      />
    );
    const checkboxElement = screen.getByLabelText("Check me");
    fireEvent.click(checkboxElement);
    expect(mockSetIsChecked).toHaveBeenCalledTimes(1);
  });

  it("calls taskAPI.edittask and updates isChecked state when isForChangeCompletedStatus is true", async () => {
    const taskId = "task-123";
    render(
      <Checkbox
        isChecked={false}
        setIsChecked={mockSetIsChecked}
        label="Check me"
        isForChangeCompletedStatus
        id={taskId}
      />
    );
    const checkboxElement = screen.getByLabelText("Check me");

    fireEvent.click(checkboxElement);
    expect(taskAPI.edittask).toHaveBeenCalledTimes(1);
    expect(taskAPI.edittask).toHaveBeenCalledWith({
      _id: taskId,
      isCompleted: true,
    });

    await screen.findByText("Check me"); // Wait for any component update

    expect(mockSetIsChecked).toHaveBeenCalledTimes(1);
  });

  it("does not call taskAPI.edittask and updates isChecked state when isForChangeCompletedStatus is false", () => {
    render(
      <Checkbox
        isChecked={false}
        setIsChecked={mockSetIsChecked}
        label="Check me"
        isForChangeCompletedStatus={false}
      />
    );
    const checkboxElement = screen.getByLabelText("Check me");

    fireEvent.click(checkboxElement);
    expect(taskAPI.edittask).not.toHaveBeenCalled();
    expect(mockSetIsChecked).toHaveBeenCalledTimes(1);
  });

  it("Rounded if we have prop isRounded", () => {
    render(
      <Checkbox
        isChecked={false}
        setIsChecked={mockSetIsChecked}
        label="Check me"
        isRounded
        isForChangeCompletedStatus={false}
      />
    );
    const spanElement = screen.getByTestId("checkbox-span");
    expect(spanElement).toHaveClass("roundedCheckMark");
  });

  it("Is not rounded if we have not prop isRounded", () => {
    render(
      <Checkbox
        isChecked={false}
        setIsChecked={mockSetIsChecked}
        label="Check me"
        isForChangeCompletedStatus={false}
      />
    );
    const spanElement = screen.getByTestId("checkbox-span");
    expect(spanElement).toHaveClass("checkmark");
  });
});
