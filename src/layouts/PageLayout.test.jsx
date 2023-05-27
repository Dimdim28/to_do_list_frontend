import React from "react";
import { render, screen } from "@testing-library/react";
import PageLayout from "./PageLayout";

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

describe("PageLayout", () => {
  test("renders Header, Preloader, Outlet, and Footer components", () => {
    render(
      <PageLayout>
        <div>Test Outlet</div>
      </PageLayout>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
