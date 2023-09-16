import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';

import { ChangePass } from "./ChangePass";
import store from "../../../redux/store";

describe("ChangePass", () => {
  test("should render form with inputs and submit button", () => {
    render(
      <Provider store={store}>
        <Router>
          <ChangePass id="1" />
        </Router>
      </Provider>
    );

    expect(screen.getByText("password")).toBeInTheDocument();
    expect(screen.getByText("newPassword")).toBeInTheDocument();
  });
});