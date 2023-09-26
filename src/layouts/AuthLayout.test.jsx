import { render, screen } from "@testing-library/react";

import AuthLayout from "./AuthLayout";

jest.mock("../components/LogRegHeader/LogRegHeader", () => () => (
  <div data-testid="logRegHeader">Header component</div>
));

jest.mock("../components/Footer/Footer", () => () => (
  <div data-testid="footer">Footer component</div>
));

jest.mock("../components/Preloader/Preloader", () => () => (
  <div data-testid="preloader">Preloader component</div>
));

jest.mock("react-router", () => ({
  Outlet: () => <div data-testid="outlet">Outlet component</div>,
}));

describe("AuthLayout", () => {
  it("renders Header, Preloader, Outlet, and Footer components", () => {
    render(
      <AuthLayout>
        <div>Test Outlet</div>
      </AuthLayout>
    );

    expect(screen.getByTestId("logRegHeader")).toBeInTheDocument();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
