import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Buttons from "./Buttons";
import store from "../../../../redux/store";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const renderButtons = () => {
  render(
    <Provider store={store}>
      <Router>
        <Buttons setIsExiting={jest.fn()} setIspassEditing={jest.fn()} setIsAccountDeleting={jest.fn()} />
      </Router>
    </Provider>
  );
};

describe("Buttons", () => {
  beforeEach(() => {
    renderButtons();
  });

  it("renders without crashing", () => {
    expect(screen.getByTestId("buttons-component")).toBeInTheDocument();
    expect(screen.getByTestId("exit-button")).toBeInTheDocument();
    expect(screen.getByTestId("change-password-button")).toBeInTheDocument();
    expect(screen.getByTestId("delete-account-button")).toBeInTheDocument();
  });

  it("renders without errors", () => {
    expect(screen.queryByTestId("error")).toBeNull();
  });

  it("triggers logOut action on exit button click", () => {
    fireEvent.click(screen.getByTestId("exit-button"));
    expect(screen.getByTestId("exit-button")).toHaveTextContent("logOut");
  });

  it("triggers setIsAccountDeleting action on delete account button click", () => {
    fireEvent.click(screen.getByTestId("delete-account-button"));
    expect(screen.getByTestId("delete-account-button")).toHaveTextContent("deleteAccount");
  });

  it("changes the text of the change password button when clicked once", () => {
    fireEvent.click(screen.getByTestId("change-password-button"));
    expect(screen.getByTestId("change-password-button")).toHaveTextContent("changePassword");
  });

  it("changes the text of the change password button when clicked twice", () => {
    fireEvent.click(screen.getByTestId("change-password-button"));
    fireEvent.click(screen.getByTestId("change-password-button"));
    expect(screen.getByTestId("change-password-button")).toHaveTextContent("changePassword");
  });
});
