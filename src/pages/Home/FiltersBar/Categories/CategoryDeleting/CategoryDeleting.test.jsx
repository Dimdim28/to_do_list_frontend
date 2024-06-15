import { Provider } from "react-redux";
import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";

import { CategoryDeleting } from "./CategoryDeleting";
import categoryAPI from "../../../../../api/categoryAPI";
import { Status } from "../../../../../types";
import store from "../../../../../redux/store";


jest.mock("../../../../../api/categoryAPI", () => ({
    deleteCategory: jest.fn(),
}));

jest.mock("../../../../../redux/slices/home/home", () => ({
    removeCategoryFromList: jest.fn(),
}));

const mockToggleActive = jest.fn();

const mockChildProps = {
    _id: "1",
    title: "Category 1",
    color: "#ff0000",
    taskFetchingParams: {},
};

  describe("CategoryDeleting", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test("should render the component with title and buttons", () => {
      render(
        <Provider store={store}>
          <CategoryDeleting toggleActive={mockToggleActive} childProps={mockChildProps} />
        </Provider>
      );

      expect(screen.getByText("no")).toBeInTheDocument();
      expect(screen.getByText("yes")).toBeInTheDocument();
      expect(screen.getByText("Category 1")).toBeInTheDocument();
    });
  
    test("should call toggleActive with false on cancel button click", () => {
      render(
        <Provider store={store}>
          <CategoryDeleting toggleActive={mockToggleActive} childProps={mockChildProps} />
        </Provider>
      );
  
      const cancelButton = screen.getByText("no");
      fireEvent.click(cancelButton);
  
      expect(mockToggleActive).toHaveBeenCalledWith(false);
    });
  
    test("should display error message if deleteCategory API returns an error", async () => {
      const errorMessage = "Failed to delete category";
      jest.spyOn(categoryAPI, "deleteCategory").mockResolvedValue({
        status: Status.ERROR,
        message: errorMessage,
      });
  
      render(
        <Provider store={store}>
          <CategoryDeleting toggleActive={mockToggleActive} childProps={mockChildProps} />
        </Provider>
      );
  
      const submitButton = screen.getByText("yes");
      fireEvent.click(submitButton);
  
      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });
  });
