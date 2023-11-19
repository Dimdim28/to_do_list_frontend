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

const exitButton = screen.getByTestId("exit-button-component");
const changePasswordButton = screen.getByTestId("change-password-button-component");
const deleteAccountButton = screen.getByTestId("delete-account-button-component");

describe("Buttons", () => {
  beforeEach(() => {
    renderButtons();
  });

  it("renders without crashing", () => {
    expect(screen.getByTestId("buttons-container")).toBeInTheDocument();
    expect(exitButton).toBeInTheDocument();
    expect(
      changePasswordButton
    ).toBeInTheDocument();
    expect(
      deleteAccountButton
    ).toBeInTheDocument();
  });

  it("renders without errors", () => {
    expect(screen.queryByTestId("error")).toBeNull();
  });

  it("triggers logOut action on exit button click", () => {
    fireEvent.click(exitButton);
    expect(exitButton).toHaveTextContent(
      "logOut"
    );
  });

  it("triggers setIsAccountDeleting action on delete account button click", () => {
    fireEvent.click(deleteAccountButton);
    expect(
      deleteAccountButton
    ).toHaveTextContent("deleteAccount");
  });

  it("changes the text of the change password button when clicked once", () => {
    fireEvent.click(changePasswordButton);
    expect(
      changePasswordButton
    ).toHaveTextContent("changePassword");
  });

  it("changes the text of the change password button when clicked twice", () => {
    fireEvent.click(changePasswordButton);
    fireEvent.click(changePasswordButton);
    expect(
      changePasswordButton
    ).toHaveTextContent("changePassword");
  });

  it("triggers setIsExitingMock action on exit button click", () => {
    fireEvent.click(exitButton);
    expect(setIsExitingMock).toHaveBeenCalled();
  });

  it("triggers setIsAccountDeletingMock action on delete account button click", () => {
    fireEvent.click(deleteAccountButton);
    expect(setIsAccountDeletingMock).toHaveBeenCalled();
  });

  it("triggers setIspassEditingMock action on change password button click", () => {
    fireEvent.click(changePasswordButton);
    expect(setIspassEditingMock).toHaveBeenCalled();
  });

  it("triggers setIsExitingMock action with true on exit button click", () => {
    fireEvent.click(exitButton);
    expect(setIsExitingMock).toHaveBeenCalledWith(true);
  });

  it("triggers setIsAccountDeletingMock action with true on delete account button click", () => {
    fireEvent.click(deleteAccountButton);
    expect(setIsAccountDeletingMock).toHaveBeenCalledWith(true);
  });
});
