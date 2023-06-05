import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination", () => {
  test("renders pagination buttons correctly", () => {
    render(
      <Pagination currentPage={3} totalPages={5} setCurrentPage={jest.fn()} />
    );

    expect(screen.getByText("<<")).toBeInTheDocument();
    expect(screen.getByText("<")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText(">")).toBeInTheDocument();
    expect(screen.getByText(">>")).toBeInTheDocument();
  });

  test("calls setCurrentPage correctly on button click", () => {
    const setCurrentPageMock = jest.fn();
    render(
      <Pagination currentPage={3} totalPages={5} setCurrentPage={setCurrentPageMock} />
    );

    fireEvent.click(screen.getByText("<<"));
    expect(setCurrentPageMock).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText("<"));
    expect(setCurrentPageMock).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText(">"));
    expect(setCurrentPageMock).toHaveBeenCalledWith(4);

    fireEvent.click(screen.getByText(">>"));
    expect(setCurrentPageMock).toHaveBeenCalledWith(5);
  });

  test("disables buttons correctly based on currentPage and totalPages", () => {
    render(
      <Pagination currentPage={1} totalPages={5} setCurrentPage={jest.fn()} />
    );

    expect(screen.getByText("<<")).toHaveClass("disabledPageButton");
    expect(screen.getByText("<")).toHaveClass("disabledPageButton");
    expect(screen.getByText("1")).toHaveClass("activePageButton");
    expect(screen.getByText(">")).not.toHaveClass("disabledPageButton");
    expect(screen.getByText(">>")).not.toHaveClass("disabledPageButton");
  });
});
