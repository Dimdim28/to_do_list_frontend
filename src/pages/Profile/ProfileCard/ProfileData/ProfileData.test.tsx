import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";

import ProfileData from "./ProfileData";
import store from "../../../../redux/store";

const renderProfileData = () => {
  render(
    <Provider store={store}>
      <ProfileData />
    </Provider>
  );
};

describe("ProfileData", () => {
  beforeEach(() => {
    renderProfileData();
  });

  it("renders without crashing", () => {
    expect(screen.getByTestId("profile-data-container")).toBeInTheDocument();
  });

  it("renders without errors", () => {
    expect(screen.queryByTestId("error")).toBeNull();
  });
});
