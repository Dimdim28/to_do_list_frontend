import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Buttons from "./Buttons";
import store from "../../../../redux/store";

const setIsExitingMock = jest.fn();
const setIspassEditingMock = jest.fn();
const setIsAccountDeletingMock = jest.fn();

const renderButtons = () => {
  render(
    <Provider store={store}>
      <Router>
        <Buttons
          setIsExiting={setIsExitingMock}
          setIspassEditing={setIspassEditingMock}
          setIsAccountDeleting={setIsAccountDeletingMock}
        />
      </Router>
    </Provider>
  );
};

beforeEach(() => {
  renderButtons();
});

describe("Buttons", () => {
  it("renders without crashing", () => {
    expect(screen.getByTestId("buttons-container")).toBeInTheDocument();
    expect(screen.getByTestId("exit-button-component")).toBeInTheDocument();
    expect(
      screen.getByTestId("change-password-button-component")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("delete-account-button-component")
    ).toBeInTheDocument();
  });

  it("renders without errors", () => {
    expect(screen.queryByTestId("error")).toBeNull();
  });

  it("triggers logOut action on exit button click", () => {
    fireEvent.click(screen.getByTestId("exit-button-component"));
    expect(screen.getByTestId("exit-button-component")).toHaveTextContent(
      "logOut"
    );
  });

  it("triggers setIsAccountDeleting action on delete account button click", () => {
    fireEvent.click(screen.getByTestId("delete-account-button-component"));
    expect(
      screen.getByTestId("delete-account-button-component")
    ).toHaveTextContent("deleteAccount");
  });

  it("changes the text of the change password button when clicked once", () => {
    fireEvent.click(screen.getByTestId("change-password-button-component"));
    expect(
      screen.getByTestId("change-password-button-component")
    ).toHaveTextContent("changePassword");
  });

  it("changes the text of the change password button when clicked twice", () => {
    fireEvent.click(screen.getByTestId("change-password-button-component"));
    fireEvent.click(screen.getByTestId("change-password-button-component"));
    expect(
      screen.getByTestId("change-password-button-component")
    ).toHaveTextContent("changePassword");
  });

  it("triggers setIsExitingMock action on exit button click", () => {
    fireEvent.click(screen.getByTestId("exit-button-component"));
    expect(setIsExitingMock).toHaveBeenCalled();
  });

  it("triggers setIsAccountDeletingMock action on delete account button click", () => {
    fireEvent.click(screen.getByTestId("delete-account-button-component"));
    expect(setIsAccountDeletingMock).toHaveBeenCalled();
  });

  it("triggers setIspassEditingMock action on change password button click", () => {
    fireEvent.click(screen.getByTestId("change-password-button-component"));
    expect(setIspassEditingMock).toHaveBeenCalled();
  });

  it("triggers setIsExitingMock action with true on exit button click", () => {
    fireEvent.click(screen.getByTestId("exit-button-component"));
    expect(setIsExitingMock).toHaveBeenCalledWith(true);
  });

  it("triggers setIsAccountDeletingMock action with true on delete account button click", () => {
    fireEvent.click(screen.getByTestId("delete-account-button-component"));
    expect(setIsAccountDeletingMock).toHaveBeenCalledWith(true);
  });
});
