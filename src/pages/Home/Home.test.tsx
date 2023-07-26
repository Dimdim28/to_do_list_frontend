import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";

import Home from "./Home";
import store from "../../redux/store";

describe("Home", () => {
  test("renders without errors", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getByText("Create Category +")).toBeInTheDocument();
    expect(screen.getByText("Date and status")).toBeInTheDocument();
    expect(screen.getByText("Deadline filters")).toBeInTheDocument();
    expect(screen.getByText("Completion status")).toBeInTheDocument();
  });
});
