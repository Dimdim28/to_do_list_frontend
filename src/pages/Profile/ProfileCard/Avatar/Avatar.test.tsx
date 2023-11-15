import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Avatar from "./Avatar";
import store from "../../../../redux/store";

const renderAvatar = () => {
  render(
    <Provider store={store}>
      <Router>
        <Avatar />
      </Router>
    </Provider>
  );
};

describe("Avatar", () => {
  beforeEach(() => {
    renderAvatar();
  });

  it("renders without crashing", () => {
    expect(screen.getByTestId("avatar-component")).toBeInTheDocument();
  });

  it("displays the file input", () => {
    expect(screen.getByTestId("file-input")).toBeInTheDocument();
  });

  it("displays the add photo button", () => {
    expect(screen.getByTestId("add-photo")).toBeInTheDocument();
  });

  it("displays the camera icon", () => {
    expect(screen.getByTestId("camera-icon")).toBeInTheDocument();
  });
});