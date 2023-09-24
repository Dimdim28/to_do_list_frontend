import { render, screen } from "@testing-library/react";

import HomeLayout from "./HomeLayout";

jest.mock("../components/Header/Header", () => () => (
  <div data-testid="header">Header component</div>
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

describe("HomeLayout", () => {
  it("renders Header, Preloader, Outlet, and Footer components", () => {
    render(
      <HomeLayout>
        <div>Test Outlet</div>
      </HomeLayout>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
