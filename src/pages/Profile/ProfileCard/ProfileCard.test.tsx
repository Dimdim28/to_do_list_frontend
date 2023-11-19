import { Provider } from "react-redux";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import ProfileCard from "./ProfileCard";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
let store: any;
beforeEach(() => {
    store = mockStore({
        profile: {
            data: {
              _id: '6558d078387e9e89400b3389',
              username: 'aaaaaa',
              password: '81ceff938609d287.8d03894ea7b528aad7f66e1f24c3aeac6e2808186d113b1889305899c23264a3',
              email: 'aaa@aaa.com',
              tasks: [],
              categories: [],
              avatar: null,
              createdAt: '2023-11-18T14:55:52.948Z',
              updatedAt: '2023-11-18T14:55:52.948Z',
              avatarUrl: null
            },
            status: 'loading',
            stats: [],
            message: ''
        },
    });
});

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe("ProfileCard Component", () => {
    it("should render profile card", () => {
        render(
            <Provider store={store}>
                <ProfileCard
                    isNameEditing={false}
                    setIsNameEditing={() => {}}
                    name={"aaaaaa"}
                    setName={() => {}}
                    id={"6558d078387e9e89400b3389"}
                    setIsExiting={() => {}}
                    setIspassEditing={() => {}}
                    setIsAccountDeleting={() => {}}
                    isAccountDeleting={false}
                    isExiting={false}
                />
            </Provider>
        );

        expect(screen.getByTestId("profile-data-container")).toBeInTheDocument();
        expect(screen.getByTestId("avatar-container")).toBeInTheDocument();
        expect(screen.getByTestId("id")).toBeInTheDocument();
        expect(screen.getByTestId("info")).toBeInTheDocument();
        expect(screen.getByTestId("name")).toBeInTheDocument();
        expect(screen.getByTestId("buttons-container")).toBeInTheDocument();
    });

    it("should show id when clicked", () => {
        render(
            <Provider store={store}>
                <ProfileCard
                    isNameEditing={false}
                    setIsNameEditing={() => {}}
                    name={"aaaaaa"}
                    setName={() => {}}
                    id={"6558d078387e9e89400b3389"}
                    setIsExiting={() => {}}
                    setIspassEditing={() => {}}
                    setIsAccountDeleting={() => {}}
                    isAccountDeleting={false}
                    isExiting={false}
                />
            </Provider>
        );

        fireEvent.click(screen.getByTestId("id"));
        expect(screen.getByTestId("id")).toHaveTextContent("6558d078387e9e89400b3389");
    });

    it("should copy id to clipboard when clicked", () => {
        render(
            <Provider store={store}>
                <ProfileCard
                    isNameEditing={false}
                    setIsNameEditing={() => {}}
                    name={"aaaaaa"}
                    setName={() => {}}
                    id={"6558d078387e9e89400b3389"}
                    setIsExiting={() => {}}
                    setIspassEditing={() => {}}
                    setIsAccountDeleting={() => {}}
                    isAccountDeleting={false}
                    isExiting={false}
                />
            </Provider>
        );
        
        fireEvent.click(screen.getByTestId("id"));
        waitFor(() => {
            expect(screen.getByTestId("id")).toHaveTextContent("Copied to Clipboard");
        });
    });
});
