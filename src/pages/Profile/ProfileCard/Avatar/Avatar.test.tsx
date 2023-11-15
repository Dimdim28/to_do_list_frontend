import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Avatar from "./Avatar";
import store from "../../../../redux/store";

describe("Avatar", () => {
  test("renders without crashing", () => {
    render(
      <Provider store={store}>
        <Router>
          <Avatar />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId("avatar-component")).toBeInTheDocument();
  });

  test("displays the file input", () => {
    render(
      <Provider store={store}>
        <Router>
          <Avatar />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId("file-input")).toBeInTheDocument();
  });

  test("displays the add photo button", () => {
    render(
      <Provider store={store}>
        <Router>
          <Avatar />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId("add-photo")).toBeInTheDocument();
  });

  test("displays the camera icon", () => {
    render(
      <Provider store={store}>
        <Router>
          <Avatar />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId("camera-icon")).toBeInTheDocument();
  });
});