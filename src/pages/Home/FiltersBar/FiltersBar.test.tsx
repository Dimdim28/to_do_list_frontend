import React from "react";
import { render, screen } from "@testing-library/react";
import FiltersBar from "./FiltersBar";
import { Provider } from "react-redux";
import store from "../../../redux/store";

describe("FiltersBar", () => {
  const mockDate = "week";
  const mockSetDate = jest.fn();
  const mockIsCompleted = "all";
  const mockSetIsCompleted = jest.fn();
  const mockCategories = [
    { _id: "1", title: "Category 1", color: "#ffffff" },
    { _id: "2", title: "Category 2", color: "#ffffff" },
  ];
  const mockSetCategories = jest.fn();
  const mockTaskFetchingParams = {};
  const mockFetchTasks = jest.fn();

  test("renders the FiltersBar component with categories and filters", () => {
    render(
      <Provider store={store}>
        <FiltersBar
          date={mockDate}
          setDate={mockSetDate}
          isCompleted={mockIsCompleted}
          setIsCompleted={mockSetIsCompleted}
          categories={mockCategories}
          setCategories={mockSetCategories}
          taskFetchingParams={mockTaskFetchingParams}
          fetchTasks={mockFetchTasks}
        />
      </Provider>
    );

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getByText("Date and status")).toBeInTheDocument();
    expect(screen.getByText("Deadline filters")).toBeInTheDocument();
    expect(screen.getByText("Completion status")).toBeInTheDocument();
  });
});
