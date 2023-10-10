import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import FAQ from "./FAQ";

i18n.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      translation: {
        question1: "Question1",
        answer1: "Answer1",
        question2: "Question2",
        answer2: "Answer2",
        question3: "Question3",
        answer3: "Answer3",
        question4: "Question4",
        answer4: "Answer4",
        faqBold: "FAQ",
      },
    },
  },
});

describe("FAQ", () => {
  it("renders FAQ component with questions and answers", () => {
    render(
      <Router>
        <I18nextProvider i18n={i18n}>
          <FAQ />
        </I18nextProvider>
      </Router>
    );

    expect(screen.getByText("FAQ")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Question1"));
    expect(screen.getByText("Answer1")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Question2"));
    expect(screen.getByText("Answer2")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Question3"));
    expect(screen.getByText("Answer3")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Question4"));
    expect(screen.getByText("Answer4")).toBeInTheDocument();
  });

  it("toggles FAQ answers when clicking on questions", () => {
    render(
      <Router>
        <I18nextProvider i18n={i18n}>
          <FAQ />
        </I18nextProvider>
      </Router>
    );

    expect(screen.getByText("FAQ")).toBeInTheDocument();

    expect(screen.queryByText("Answer1")).toBeNull();
    expect(screen.queryByText("Answer2")).toBeNull();
    expect(screen.queryByText("Answer3")).toBeNull();
    expect(screen.queryByText("Answer4")).toBeNull();
    
    fireEvent.click(screen.getByText("Question1"));
    expect(screen.getByText("Answer1")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Question2"));
    expect(screen.getByText("Answer2")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Question3"));
    expect(screen.getByText("Answer3")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Question4"));
    expect(screen.getByText("Answer4")).toBeInTheDocument();
  });
});
