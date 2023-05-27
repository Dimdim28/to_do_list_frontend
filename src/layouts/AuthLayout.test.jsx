import React from "react";
import { render, screen } from "@testing-library/react";
import AuthLayout from "./AuthLayout";

jest.mock("../components/Preloader/Preloader", () => ({
  __esModule: true,
  default: () => <div data-testid="preloader">Preloader component</div>,
}));

jest.mock("react-router", () => ({
  Outlet: () => <div data-testid="outlet">Outlet component</div>,
}));

describe("AuthLayout", () => {
  it("renders Preloader component while suspending", () => {
    render(
      <AuthLayout>
        <div>Test Outlet</div>
      </AuthLayout>
    );

    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });

  it("renders Outlet component after suspending", async () => {
    render(
      <AuthLayout>
        <div>Test Outlet</div>
      </AuthLayout>
    );

    await screen.findByTestId("outlet");

    expect(screen.queryByTestId("preloader")).toBeNull();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });
});
