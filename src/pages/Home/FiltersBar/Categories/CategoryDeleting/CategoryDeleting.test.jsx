import React from "react";
import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import { CategoryDeleting } from "./CategoryDeleting";
import categoryAPI from "../../../../../api/categoryAPI";
import { removeCategoryFromList } from "../../../../../redux/slices/home/home";
import { Status } from "../../../../../types";
import { Provider } from "react-redux";
import store from "../../../../../redux/store";
import userEvent from "@testing-library/user-event";

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

describe("CategoryDeleting", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render the component with title and buttons", () => {
        render(
            <Provider store={store}>
                <CategoryDeleting toggleActive={mockToggleActive} childProps={mockChildProps} />
            </Provider>

        );

        expect(screen.getByText("cancel")).toBeInTheDocument();
        expect(screen.getByText("submit")).toBeInTheDocument();
        expect(screen.getByText("Category 1")).toBeInTheDocument();

    });

    it("should call toggleActive with false on cancel button click", () => {
        render(
            <Provider store={store}>
                <CategoryDeleting toggleActive={mockToggleActive} childProps={mockChildProps} />
            </Provider>
        );

        const cancelButton = screen.getByText("cancel");
        fireEvent.click(cancelButton);

        expect(mockToggleActive).toHaveBeenCalledWith(false);
    });

    it("should display error message if deleteCategory API returns an error", async () => {
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

        const submitButton = screen.getByText("submit");
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });
});
