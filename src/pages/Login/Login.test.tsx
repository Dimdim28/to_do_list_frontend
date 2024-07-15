import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import store from "../../redux/store";

import Login from "./Login";

describe("Login", () => {
  test("renders the login form", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    expect(screen.getByText("email")).toBeInTheDocument();
    expect(screen.getByText("password")).toBeInTheDocument();
    expect(screen.getByText("signIn")).toBeInTheDocument();
    expect(screen.getByText("signUp")).toBeInTheDocument();
  });
});
