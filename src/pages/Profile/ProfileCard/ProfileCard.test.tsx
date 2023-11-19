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
        _id: "22",
        username: "Ivan",
        password: "NotToday",
        email: "ivan@mail.com",
        avatar: null,
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-11-18T12:00:00.000Z",
        avatarUrl: null,
      },
      status: "success",
      stats: [],
      message: "",
    },
  });
});

const renderProfileCard = () => {
  render(
    <Provider store={store}>
      <ProfileCard
        isNameEditing={false}
        setIsNameEditing={() => {}}
        name={"Ivan"}
        setName={() => {}}
        id={"22"}
        setIsExiting={() => {}}
        setIspassEditing={() => {}}
        setIsAccountDeleting={() => {}}
        isAccountDeleting={false}
        isExiting={false}
      />
    </Provider>
  );
};

describe("ProfileCard", () => {
  it("should render profile card", () => {
    renderProfileCard();

    expect(screen.getByTestId("profile-data-container")).toBeInTheDocument();
    expect(screen.getByTestId("avatar-container")).toBeInTheDocument();
    expect(screen.getByTestId("id")).toBeInTheDocument();
    expect(screen.getByTestId("info")).toBeInTheDocument();
    expect(screen.getByTestId("name-container")).toBeInTheDocument();
    expect(screen.getByTestId("profile-data-container")).toBeInTheDocument();
    expect(screen.getByTestId("buttons-container")).toBeInTheDocument();
  });

  it("should show id when clicked", () => {
    renderProfileCard();

    fireEvent.click(screen.getByTestId("id"));
    expect(screen.getByTestId("id")).toHaveTextContent("22");
  });

  it("should copy id to clipboard when clicked", () => {
    renderProfileCard();

    fireEvent.click(screen.getByTestId("id"));
    waitFor(() => {
      expect(screen.getByTestId("id")).toHaveTextContent("Copied to Clipboard");
    });
  });
});
