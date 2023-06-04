import React from "react";
import { render, screen } from "@testing-library/react";
import Filters, { Date, IsCompleted } from "./Filters";
import { Item } from "../../../../components/common/Select/Select";

const selectStatusOptions: Item<IsCompleted>[] = [
  { name: "Completed", value: "true" },
  { name: "In process", value: "false" },
  { name: "all", value: "all" },
];

const selectDateOptions: Item<Date>[] = [
  { name: "day", value: "day" },
  { name: "week", value: "week" },
  { name: "month", value: "month" },
  { name: "year", value: "year" },
  { name: "all", value: "all" },
  { name: "outdated", value: "outdated" },
];

describe("Filters", () => {
  const mockDate: Date = "day";
  const mockIsCompleted: IsCompleted = "true";
  const mockSetDate = jest.fn();
  const mockSetIsCompleted = jest.fn();

  test("renders the Filters component", () => {
    render(
      <Filters
        date={mockDate}
        isCompleted={mockIsCompleted}
        setDate={mockSetDate}
        setIsCompleted={mockSetIsCompleted}
      />
    );

    expect(screen.getByText("Deadline filters")).toBeInTheDocument();
    expect(screen.getByText("Date and status")).toBeInTheDocument();
    expect(screen.getByText("Completion status")).toBeInTheDocument();
  });

  describe("It should pass correct props", () => {
    it("should render correctly completion status", () => {
      for (const { value } of selectStatusOptions) {
        render(
          <Filters
            date={mockDate}
            isCompleted={value}
            setDate={mockSetDate}
            setIsCompleted={mockSetIsCompleted}
          />
        );
        expect(screen.getByText(value)).toBeInTheDocument();
      }
    });
    it("should render correctly date option", () => {
      for (const { name, value } of selectDateOptions) {
        render(
          <Filters
            date={value}
            isCompleted={mockIsCompleted}
            setDate={mockSetDate}
            setIsCompleted={mockSetIsCompleted}
          />
        );
        expect(screen.getByText(name)).toBeInTheDocument();
      }
    });
  });
});
