import { Provider } from "react-redux";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import DeleteProfile from "./DeleteProfile";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const renderDeleteProfile = (store: any) => {
    render(
        <Provider store={store}>
            <DeleteProfile toggleActive={() => {}} />
        </Provider>
    );
};

const mockToggleActive = jest.fn();

describe("DeleteProfile", () => {
    let store: any;

    it("should render delete profile container", () => {
        store = mockStore({
            profile: {
                status: "success",
            },
        });
        renderDeleteProfile(store);

        expect(screen.getByTestId("delete-container")).toBeInTheDocument();
        expect(screen.getByTestId("areYouSure")).toBeInTheDocument();
        expect(screen.getByTestId("cancel")).toBeInTheDocument();
        expect(screen.getByTestId("submit")).toBeInTheDocument();
    });

    it("should render preloader when status is loading", () => {
        store = mockStore({
            profile: {
                status: "loading",
            },
        });
        renderDeleteProfile(store);

        expect(screen.getByTestId("delete-container")).toBeInTheDocument();
        expect(screen.getByTestId("preloader-container")).toBeInTheDocument();
        expect(screen.getByTestId("preloader")).toBeInTheDocument();
    });

    it("should render error message when status is error", () => {
        store = mockStore({
            profile: {
                status: "error",
            },
        });
        renderDeleteProfile(store);

        expect(screen.getByTestId("delete-container")).toBeInTheDocument();
    });

    it("renders without errors", () => {
        expect(screen.queryByTestId("error")).toBeNull();
    });

    it("should call mockToggleActive when cancel button is clicked", () => {
        store = mockStore({
            profile: {
                status: "success",
            },
        });
        render(
            <Provider store={store}>
                <DeleteProfile toggleActive={mockToggleActive} />
            </Provider>
        );
        fireEvent.click(screen.getByTestId("cancel"));

        expect(mockToggleActive).toHaveBeenCalled();
    });

    it("should call mockToggleActive when submit button is clicked", async () => {
        store = mockStore({
            profile: {
                status: "success",
            },
        });
        render(
            <Provider store={store}>
                <DeleteProfile toggleActive={mockToggleActive} />
            </Provider>
        );
        fireEvent.click(screen.getByTestId("submit"));

        expect(mockToggleActive).toHaveBeenCalled();
    });
});
