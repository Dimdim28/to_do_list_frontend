import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const footer = screen.getByText(
    /To do list will help you to manage your tasks/i
  );
  expect(footer).toBeInTheDocument();
});
