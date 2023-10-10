import { render, screen } from "@testing-library/react";
import { useTranslation } from "react-i18next";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";

import Footer from "./FAQFooter";
import { TranslationKeys } from "../../types";
import store from "../../redux/store";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

describe("FAQFooter", () => {
  beforeEach(() => {
    const useTranslationSpy = useTranslation as jest.Mock;
    const tSpy = jest.fn((str) => str);
    useTranslationSpy.mockReturnValue({
      t: tSpy,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    });
  });

  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Footer />
        </Provider>
      </MemoryRouter>
    );
    const footerElement = screen.getByText(TranslationKeys.Footer);
    expect(footerElement).toBeInTheDocument();
  });

  it("has the correct class name", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Footer />
        </Provider>
      </MemoryRouter>
    );
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toHaveClass("footer");
  });
});
