import React from 'react';
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';

import { ChangePass } from "./ChangePass";
import store from "../../../redux/store";



describe("ChangePass", () => {
  test("should render the form with inputs and submit button", () => {
    render(
      <Provider store={store}>
        <Router>
          <ChangePass id="1" />
        </Router>
      </Provider>
    );

    expect(screen.getByText("password")).toBeInTheDocument();
    expect(screen.getByText("new password")).toBeInTheDocument();
  });
});