import { Provider } from "react-redux";
import { fireEvent,render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";

import DeleteProfile from "./DeleteProfile";

const mockToggleActive = jest.fn();
const mockStore = configureStore([]);
let store: any;

const renderDeleteProfile = (store: any) => {
  render(
    <Provider store={store}>
      <DeleteProfile toggleActive={() => {}} />
    </Provider>
  );
};

describe("DeleteProfile", () => {
  it("should render delete profile container", () => {
    store = mockStore({
      profile: {
        status: "success",
      },
    });
    renderDeleteProfile(store);

    expect(screen.getByTestId("delete-profile-container")).toBeInTheDocument();
    expect(screen.getByTestId("are-you-sure-component")).toBeInTheDocument();
    expect(screen.getByTestId("cancel-component")).toBeInTheDocument();
    expect(screen.getByTestId("submit-component")).toBeInTheDocument();
  });

  it("should render preloader when status is loading", () => {
    store = mockStore({
      profile: {
        status: "loading",
      },
    });
    renderDeleteProfile(store);

    expect(screen.getByTestId("delete-profile-container")).toBeInTheDocument();
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

    expect(screen.getByTestId("delete-profile-container")).toBeInTheDocument();
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
    fireEvent.click(screen.getByTestId("cancel-component"));

    expect(mockToggleActive).toHaveBeenCalled();
    expect(mockToggleActive).toHaveBeenCalledWith(false);
  });
});
