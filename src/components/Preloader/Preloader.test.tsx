import React from "react";
import { render, screen } from "@testing-library/react";
import Preloader from "./Preloader";

describe("Preloader", () => {
  it("renders preloader container", () => {
    render(<Preloader />);
    const preloaderContainer = screen.getByTestId("preloader-container");
    expect(preloaderContainer).toBeInTheDocument();
  });

  it("renders preloader element", () => {
    render(<Preloader />);
    const preloaderElement = screen.getByTestId("preloader");
    expect(preloaderElement).toBeInTheDocument();
  });

  it("renders loader element", () => {
    render(<Preloader />);
    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    render(<Preloader />);
    const preloaderContainer = screen.getByTestId("preloader-container");
    const preloaderElement = screen.getByTestId("preloader");
    const loaderElement = screen.getByTestId("loader");

    expect(preloaderContainer).toHaveClass("preloaderContainer");
    expect(preloaderElement).toHaveClass("preloader");
    expect(loaderElement).toHaveClass("loader");
  });
});
