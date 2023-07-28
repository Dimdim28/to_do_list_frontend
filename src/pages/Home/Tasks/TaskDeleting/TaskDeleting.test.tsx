import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import TaskDeleting from "./TaskDeleting";
import taskAPI from "../../../../api/taskAPI";
import { truncate } from "../../../../helpers/string";
import { Status } from "../../../../types";

jest.mock("../../../../api/taskAPI");

describe("TaskDeleting", () => {
  const childProps = {
    _id: "1",
    title: "abcd",
    fetchTasks: jest.fn(),
    taskFetchingParams: {},
    setCurrentPage: () => {},
    length: 10,
    user: "fgd",
    createdAt: "2021-03-20",
    updatedAt: "2021-03-20",
  };

  test("displays the confirmation message and buttons", () => {
    render(<TaskDeleting toggleActive={jest.fn()} childProps={childProps} />);

    expect(
      screen.getByText("Do you really want to delete task:")
    ).toBeInTheDocument();
    expect(screen.getByText("abcd")).toBeInTheDocument();
    expect(screen.getByText("cancel")).toBeInTheDocument();
    expect(screen.getByText("submit")).toBeInTheDocument();
  });

  test("calls toggleActive with false on cancel button click", () => {
    const toggleActiveMock = jest.fn();
    render(
      <TaskDeleting toggleActive={toggleActiveMock} childProps={childProps} />
    );

    fireEvent.click(screen.getByText("cancel"));
    expect(toggleActiveMock).toHaveBeenCalledWith(false);
  });

  test("calls taskAPI.deleteTask and fetchTasks on submit button click", async () => {
    const fetchTasksMock = jest.fn();
    (taskAPI.deleteTask as any).mockResolvedValue({
      status: Status.SUCCESS,
      message: "Task deleted successfully",
    });
    render(
      <TaskDeleting
        toggleActive={jest.fn()}
        childProps={{ ...childProps, fetchTasks: fetchTasksMock }}
      />
    );

    fireEvent.click(screen.getByText("submit"));

    expect(taskAPI.deleteTask).toHaveBeenCalledWith("1");
    await waitFor(() =>
      expect(fetchTasksMock).toHaveBeenCalledWith(childProps.taskFetchingParams)
    );
  });

  test("displays error message when deletion fails", async () => {
    const errorMessage = "Error deleting task";
    (taskAPI.deleteTask as any).mockResolvedValue({
      status: Status.ERROR,
      message: errorMessage,
    });
    render(<TaskDeleting toggleActive={jest.fn()} childProps={childProps} />);

    fireEvent.click(screen.getByText("submit"));
    await screen.findByText(errorMessage);
  });

  test("displays preloader while deleting", async () => {
    render(<TaskDeleting toggleActive={jest.fn()} childProps={childProps} />);

    (taskAPI.deleteTask as any).mockImplementation(() => {
      return new Promise(() => {}); // Create a promise that never resolves
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    expect(screen.queryByText("cancel")).not.toBeInTheDocument();
    expect(screen.queryByText("submit")).not.toBeInTheDocument();
    expect(screen.getByTestId("preloader")).toBeInTheDocument();
  });
});
