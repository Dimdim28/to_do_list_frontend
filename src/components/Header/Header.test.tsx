import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { useTranslation } from "react-i18next";

import Header from "./Header";
import ROUTES from "../../routes";
import store from "../../redux/store";
import { Theme, TranslationKeys } from "../../types";
import { mockLocalStorage } from "../../mocs/localstorage";

export const HEADER_LINKS = [
  {
    path: ROUTES.PROFILE,
    name: "profile",
  },
  {
    path: ROUTES.HOME,
    name: "home",
  },
];

const { getItemMock, setItemMock } = mockLocalStorage();

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

let i18nChangeLanguage: jest.Mock;

describe("Header", () => {
  beforeEach(() => {
    const useTranslationSpy = useTranslation as jest.Mock;
    const tSpy = jest.fn((str) => str);
    i18nChangeLanguage = jest.fn();

    useTranslationSpy.mockReturnValue({
      t: tSpy,
      i18n: {
        changeLanguage: i18nChangeLanguage,
        language: "en",
      },
    });
  });

  it("renders logo correctly", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header links={HEADER_LINKS} />
        </Provider>
      </MemoryRouter>
    );
    const logoElement = screen.getByAltText("logo");
    expect(logoElement).toBeInTheDocument();
  });

  describe("renders profile and home links correctly", () => {
    it("they were rendered", () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <Header links={HEADER_LINKS} />
          </Provider>
        </MemoryRouter>
      );
      const profileLink = screen.getByText(TranslationKeys.Profile);
      const homeLink = screen.getByText(TranslationKeys.Home);
      expect(profileLink).toBeInTheDocument();
      expect(homeLink).toBeInTheDocument();
    });

    it("they have correct href attributes", () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <Header links={HEADER_LINKS} />
          </Provider>
        </MemoryRouter>
      );
      const profileLink = screen.getByText(TranslationKeys.Profile);
      const homeLink = screen.getByText(TranslationKeys.Home);
      expect(profileLink).toHaveAttribute("href", ROUTES.PROFILE);
      expect(homeLink).toHaveAttribute("href", ROUTES.HOME);
    });
  });

  describe("applies 'isActive' class to active link", () => {
    it("should make profile link isActive if we are on Profile page", () => {
      render(
        <MemoryRouter initialEntries={[ROUTES.PROFILE]}>
          <Provider store={store}>
            <Header links={HEADER_LINKS} />
          </Provider>
        </MemoryRouter>
      );

      const profileLink = screen.getByText(TranslationKeys.Profile);
      const homeLink = screen.getByText(TranslationKeys.Home);

      expect(profileLink).toHaveClass("isActive");
      expect(homeLink).not.toHaveClass("isActive");
    });

    it("should make home link isActive if we are on Home page", () => {
      render(
        <MemoryRouter initialEntries={[ROUTES.HOME]}>
          <Provider store={store}>
            <Header links={HEADER_LINKS} />
          </Provider>
        </MemoryRouter>
      );

      const profileLink = screen.getByText(TranslationKeys.Profile);
      const homeLink = screen.getByText(TranslationKeys.Home);

      expect(profileLink).not.toHaveClass("isActive");
      expect(homeLink).toHaveClass("isActive");

      fireEvent.click(profileLink);

      expect(profileLink).toHaveClass("isActive");
      expect(homeLink).not.toHaveClass("isActive");
    });
  });

  describe("Theme icon", () => {
    it("should render initial state correctly", () => {
      getItemMock.mockReturnValue(Theme.DARK);

      render(
        <MemoryRouter>
          <Provider store={store}>
            <Header links={HEADER_LINKS} />
          </Provider>
        </MemoryRouter>
      );

      const themeIcon = screen.getByTestId("theme-icon");

      expect(themeIcon.getAttribute("data-icon")).toBe("sun");
      expect(setItemMock).not.toBeCalled();
      expect(store.getState().auth.theme).toBe(Theme.DARK);
    });

    it("should change theme icon on click", () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <Header links={HEADER_LINKS} />
          </Provider>
        </MemoryRouter>
      );

      const themeIcon = screen.getByTestId("theme-icon");

      fireEvent.click(themeIcon);

      expect(setItemMock).toHaveBeenCalledWith("theme", Theme.LIGHT);
      expect(themeIcon.getAttribute("data-icon")).toBe("moon");
      expect(store.getState().auth.theme).toBe(Theme.LIGHT);
    });
  });

  describe("Language icon", () => {
    it("should render initial state correctly", () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <Header links={HEADER_LINKS} />
          </Provider>
        </MemoryRouter>
      );

      const langIcon = screen.getByTestId("lang-icon");

      expect(langIcon.textContent).toBe("en");
      expect(setItemMock).not.toBeCalled();
      expect(i18nChangeLanguage).not.toBeCalled();
      expect(store.getState().auth.lang).toBe("en");
    });

    it("should change language icon on click", () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <Header links={HEADER_LINKS} />
          </Provider>
        </MemoryRouter>
      );

      const langIcon = screen.getByTestId("lang-icon");

      fireEvent.click(langIcon);

      expect(setItemMock).toHaveBeenCalledWith("lang", "ua");
      expect(i18nChangeLanguage).toHaveBeenCalledWith("ua");
      expect(store.getState().auth.lang).toBe("ua");
    });
  });
});
