import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Header from "./LogRegHeader";
import { Provider } from "react-redux";
import store from "../../redux/store";

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
});
