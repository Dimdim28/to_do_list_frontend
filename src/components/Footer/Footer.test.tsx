import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders correctly", () => {
    render(<Footer />);
    const footerElement = screen.getByText(
      "To do list will help you to manage your tasks"
    );
    expect(footerElement).toBeInTheDocument();
  });

  it("has the correct class name", () => {
    render(<Footer />);
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toHaveClass("footer");
  });
});
