import { Provider } from "react-redux";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import Name from "./Name";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const mockToggleActive = jest.fn();

describe("Name", () => {
    let store: any;
    beforeEach(() => {
        store = mockStore({
            profile: {
                status: "success",
            },
        });
    });

    it("should render name container", () => {
        render(
            <Provider store={store}>
                <Name
                    isNameEditing={false}
                    setIsNameEditing={() => {}}
                    name={"Name"}
                    setName={() => {}}
                    id={"1"}
                />
            </Provider>
        );

        expect(screen.getByTestId("name-container")).toBeInTheDocument();
        expect(screen.getByTestId("name")).toBeInTheDocument();
        expect(screen.getByTestId("text")).toBeInTheDocument();
        expect(screen.getByTestId("edit")).toBeInTheDocument();
        expect(screen.getByTestId("pencil")).toBeInTheDocument();
    });

    it("should render input when isNameEditing is true", () => {
        render(
            <Provider store={store}>
                <Name
                    isNameEditing={true}
                    setIsNameEditing={() => {}}
                    name={"Name"}
                    setName={() => {}}
                    id={"1"}
                />
            </Provider>
        );

        expect(screen.getByTestId("name-container")).toBeInTheDocument();
        expect(screen.getByTestId("name")).toBeInTheDocument();
        expect(screen.getByTestId("inputName")).toBeInTheDocument();
        expect(screen.getByTestId("check")).toBeInTheDocument();
        expect(screen.getByTestId("close")).toBeInTheDocument();
    });

    it("should render error message when status is error", () => {
        render(
            <Provider store={store}>
                <Name
                    isNameEditing={false}
                    setIsNameEditing={() => {}}
                    name={"Name"}
                    setName={() => {}}
                    id={"1"}
                />
            </Provider>
        );

        expect(screen.getByTestId("name-container")).toBeInTheDocument();
    });

    it("renders without errors", () => {
        expect(screen.queryByTestId("error")).toBeNull();
    });

    it("should call mockToggleActive when cancel button is clicked", () => {
        render(
            <Provider store={store}>
                <Name
                    isNameEditing={false}
                    setIsNameEditing={mockToggleActive}
                    name={"Name"}
                    setName={() => {}}
                    id={"1"}
                />
            </Provider>
        );
        fireEvent.click(screen.getByTestId("edit"));

        expect(mockToggleActive).toHaveBeenCalled();
    });

    it("should call mockToggleActive when cancel button is clicked", () => {
        render(
            <Provider store={store}>
                <Name
                    isNameEditing={true}
                    setIsNameEditing={mockToggleActive}
                    name={"Name"}
                    setName={() => {}}
                    id={"1"}
                />
            </Provider>
        );
        fireEvent.click(screen.getByTestId("close"));

        expect(mockToggleActive).toHaveBeenCalled();
    });
});

