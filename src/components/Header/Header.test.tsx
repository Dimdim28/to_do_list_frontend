import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./Header";
import ROUTES from "../../routes";
import store from "../../redux/store";
import { Theme } from "../../types";
import { mockLocalStorage } from "../../mocs/localstorage";

const { getItemMock, setItemMock } = mockLocalStorage();

describe("Header", () => {
  it("renders logo correctly", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
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
            <Header />
          </Provider>
        </MemoryRouter>
      );
      const profileLink = screen.getByText("profile");
      const homeLink = screen.getByText("home");
      expect(profileLink).toBeInTheDocument();
      expect(homeLink).toBeInTheDocument();
    });

    it("they have correct href attributes", () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <Header />
          </Provider>
        </MemoryRouter>
      );
      const profileLink = screen.getByText("profile");
      const homeLink = screen.getByText("home");
      expect(profileLink).toHaveAttribute("href", ROUTES.PROFILE);
      expect(homeLink).toHaveAttribute("href", ROUTES.HOME);
    });
  });

  describe("applies 'isActive' class to active link", () => {
    it("should make profile link isActive if we are on Profile page", () => {
      render(
        <MemoryRouter initialEntries={[ROUTES.PROFILE]}>
          <Provider store={store}>
            <Header />
          </Provider>
        </MemoryRouter>
      );

      const profileLink = screen.getByText("profile");
      const homeLink = screen.getByText("home");

      expect(profileLink).toHaveClass("isActive");
      expect(homeLink).not.toHaveClass("isActive");
    });

    it("should make home link isActive if we are on Home page", () => {
      render(
        <MemoryRouter initialEntries={[ROUTES.HOME]}>
          <Provider store={store}>
            <Header />
          </Provider>
        </MemoryRouter>
      );

      const profileLink = screen.getByText("profile");
      const homeLink = screen.getByText("home");

      expect(profileLink).not.toHaveClass("isActive");
      expect(homeLink).toHaveClass("isActive");

      fireEvent.click(profileLink);

      const profileLinkAfterClick = screen.getByText("profile");
      const homeLinkAfterClick = screen.getByText("home");

      expect(profileLinkAfterClick).toHaveClass("isActive");
      expect(homeLinkAfterClick).not.toHaveClass("isActive");
    });
  });
});

describe("Theme icon", () => {
  it("should render initial state correctly", () => {
    getItemMock.mockReturnValue(Theme.DARK);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );

    const themeIcon = screen.getByTestId("theme-icon");

    expect(themeIcon.getAttribute("data-icon")).toBe("sun");
    expect(setItemMock).not.toBeCalled();
  });

  it("should change theme icon on click", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>
    );

    const themeIcon = screen.getByTestId("theme-icon");

    fireEvent.click(themeIcon);

    expect(setItemMock).toHaveBeenCalledWith("theme", Theme.LIGHT);
    expect(themeIcon.getAttribute("data-icon")).toBe("moon");
  });
});
