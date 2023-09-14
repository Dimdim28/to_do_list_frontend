import { Provider } from "react-redux";
import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import { useTranslation } from "react-i18next";

import { CategoryDeleting } from "./CategoryDeleting";
import categoryAPI from "../../../../../api/categoryAPI";
import { Status } from "../../../../../types";
import store from "../../../../../redux/store";
import { TranslationKeys } from "../../../../../types";


jest.mock("../../../../../api/categoryAPI", () => ({
    deleteCategory: jest.fn(),
}));

jest.mock("../../../../../redux/slices/home/home", () => ({
    removeCategoryFromList: jest.fn(),
}));

const mockToggleActive = jest.fn();
const mockFetchTasks = jest.fn();

const mockChildProps = {
    _id: "1",
    title: "Category 1",
    color: "#ff0000",
    fetchTasks: mockFetchTasks,
    taskFetchingParams: {},
};

jest.mock("react-i18next", () => ({
    ...jest.requireActual("react-i18next"),
    useTranslation: () => ({
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }),
  }));

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

      expect(screen.getByText(TranslationKeys.No)).toBeInTheDocument();
      expect(screen.getByText(TranslationKeys.Yes)).toBeInTheDocument();
      expect(screen.getByText("Category 1")).toBeInTheDocument();
    });
  
    test("should call toggleActive with false on cancel button click", () => {
      render(
        <Provider store={store}>
          <CategoryDeleting toggleActive={mockToggleActive} childProps={mockChildProps} />
        </Provider>
      );
  
      const cancelButton = screen.getByText(TranslationKeys.No);
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
  
      const submitButton = screen.getByText(TranslationKeys.Yes);
      fireEvent.click(submitButton);
  
      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });
  });
