import { render, screen } from "@testing-library/react";
import { useTranslation } from "react-i18next";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";

import Footer from "./Footer";
import { TranslationKeys } from "../../types";
import store from "../../redux/store";
import ROUTES from "../../routes";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

const FOOTER_LINKS = [
  {
    path: ROUTES.FAQ,
    name: "faq",
  },
  {
    path: ROUTES.HOME,
    name: "back",
  },
];

describe("Footer", () => {
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

  describe("Footer text", () => {
    it("renders text correctly", () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <Footer links={FOOTER_LINKS} />
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
            <Footer links={FOOTER_LINKS} />
          </Provider>
        </MemoryRouter>
      );
      const footerElement = screen.getByRole("contentinfo");
      expect(footerElement).toHaveClass("footer");
    });
  });

  describe("links", () => {
    it("renders links to home and FAQ correctly", () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <Footer links={FOOTER_LINKS} />
          </Provider>
        </MemoryRouter>
      );
      const faqLink = screen.getByText(TranslationKeys.FAQ);
      const homeLink = screen.getByText(TranslationKeys.Back);

      expect(faqLink).toBeInTheDocument();
      expect(homeLink).toBeInTheDocument();
    });

    it("should make FAQ link active if we are on FAQ page", () => {
      render(
        <MemoryRouter initialEntries={[ROUTES.FAQ]}>
          <Provider store={store}>
            <Footer links={FOOTER_LINKS} />
          </Provider>
        </MemoryRouter>
      );
      const faqLink = screen.getByText(TranslationKeys.FAQ);
      const homeLink = screen.getByText(TranslationKeys.Back);

      expect(faqLink).toHaveClass("isActive");
      expect(homeLink).not.toHaveClass("isActive");
    });

    it("should make home link active if we are on home page", () => {
      render(
        <MemoryRouter initialEntries={[ROUTES.HOME]}>
          <Provider store={store}>
            <Footer links={FOOTER_LINKS} />
          </Provider>
        </MemoryRouter>
      );
      const faqLink = screen.getByText(TranslationKeys.FAQ);
      const homeLink = screen.getByText(TranslationKeys.Back);

      expect(faqLink).not.toHaveClass("isActive");
      expect(homeLink).toHaveClass("isActive");
    });
  });
});
