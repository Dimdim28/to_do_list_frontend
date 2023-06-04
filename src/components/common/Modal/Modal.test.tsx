import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";
import { Category } from "../../../api/categoryAPI";

describe("Modal", () => {
  const mockSetActive = jest.fn();
  const mockChildComponent = jest.fn();

  const mockChildProps: Category = {
    _id: "1",
    title: "Test Category",
    color: "#000000",
    user: "666",
  };

  it("renders modal when active prop is true", () => {
    render(
      <Modal
        active={true}
        setActive={mockSetActive}
        ChildComponent={mockChildComponent}
        childProps={mockChildProps}
      />
    );

    const modalElement = screen.getByRole("dialog");
    expect(modalElement).toBeInTheDocument();

    const closeButton = screen.getByTestId("modal-close-button");
    expect(closeButton).toBeInTheDocument();
  });

  it("does not render modal when active prop is false", () => {
    render(
      <Modal
        active={false}
        setActive={mockSetActive}
        ChildComponent={mockChildComponent}
        childProps={mockChildProps}
      />
    );

    const modalElement = screen.queryByRole("dialog");
    expect(modalElement).not.toBeInTheDocument();
  });

  it("calls setActive(false) when modal is clicked outside", () => {
    render(
      <Modal
        active={true}
        setActive={mockSetActive}
        ChildComponent={mockChildComponent}
        childProps={mockChildProps}
      />
    );

    const modalElement = screen.getByRole("dialog-wrapper");
    fireEvent.click(modalElement);
    expect(mockSetActive).toHaveBeenCalledTimes(1);
    expect(mockSetActive).toHaveBeenCalledWith(false);
  });

  it("does not call setActive(false) when modal content is clicked", () => {
    render(
      <Modal
        active={true}
        setActive={mockSetActive}
        ChildComponent={mockChildComponent}
        childProps={mockChildProps}
      />
    );

    const modalContent = screen.getByTestId("modal-content");
    fireEvent.click(modalContent);
    expect(mockSetActive).not.toHaveBeenCalled();
  });

  it("calls setActive(false) when close button is clicked", () => {
    render(
      <Modal
        active={true}
        setActive={mockSetActive}
        ChildComponent={mockChildComponent}
        childProps={mockChildProps}
      />
    );

    const closeButton = screen.getByTestId("modal-close-button");
    fireEvent.click(closeButton);
    expect(mockSetActive).toHaveBeenCalledTimes(1);
    expect(mockSetActive).toHaveBeenCalledWith(false);
  });
});
