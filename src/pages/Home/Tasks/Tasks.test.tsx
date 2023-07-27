import { Provider } from "react-redux";
import { render, fireEvent, screen } from "@testing-library/react";

import Tasks from "./Tasks";
import { getTask } from "../../../api/taskAPI";
import store from "../../../redux/store";

describe("Tasks", () => {
  const taskFetchingParams: getTask = {
    page: 1,
    isCompleted: false,
    deadline: "",
    categories: [],
  };
  const fetchTasksMock = jest.fn();
  const setCurrentPageMock = jest.fn();

  test("renders without errors", () => {
    render(
      <Tasks
        setCurrentPage={setCurrentPageMock}
        taskFetchingParams={taskFetchingParams}
        fetchTasks={fetchTasksMock}
        isLoading={false}
        error=""
        Tasks={[]}
        totalPages={0}
      />
    );

    expect(screen.getByText("Create task +")).toBeInTheDocument();
  });

  test("clicking on 'Create task +' opens the task editing modal", () => {
    render(
      <Provider store={store}>
        <Tasks
          setCurrentPage={setCurrentPageMock}
          taskFetchingParams={taskFetchingParams}
          fetchTasks={fetchTasksMock}
          isLoading={false}
          error=""
          Tasks={[]}
          totalPages={0}
        />
      </Provider>
    );

    const createTaskButton = screen.getByText("Create task +");
    fireEvent.click(createTaskButton);

    expect(screen.getByText("cancel")).toBeInTheDocument();
    expect(screen.getByText("submit")).toBeInTheDocument();
  });
});
