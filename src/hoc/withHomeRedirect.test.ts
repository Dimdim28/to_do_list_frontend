import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { render, screen } from "@testing-library/react";

import { withHomeRedirect } from "./withHomeRedirect";
import TestComponent from "./testComponent";
import ROUTES from "../routes";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

jest.mock("react-router", () => ({
  Navigate: jest.fn(() => null),
}));

describe("withHomeRedirect", () => {
  it("renders the component when isAuth is false", () => {
    (useSelector as jest.Mock).mockReturnValueOnce(false);
    (useSelector as jest.Mock).mockReturnValueOnce(true);
    const MockComponent = withHomeRedirect(TestComponent);
    render(MockComponent());

    expect(screen.getByTestId("test-component")).toBeInTheDocument();
    expect(Navigate).not.toHaveBeenCalled();
  });

  it("renders the Navigate component when isAuth is true and isChecked is true", () => {
    (useSelector as jest.Mock).mockReturnValueOnce(true);
    (useSelector as jest.Mock).mockReturnValueOnce(true);
    const MockComponent = withHomeRedirect(TestComponent);
    render(MockComponent());

    expect(screen.queryByTestId("test-component")).not.toBeInTheDocument();
    expect(Navigate).toHaveBeenCalledWith({ to: ROUTES.HOME }, {});
  });
});
