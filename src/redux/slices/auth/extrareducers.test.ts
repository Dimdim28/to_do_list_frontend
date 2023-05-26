import { MOCK_OBJECT_ONE } from "../../../mocs/state";
import { Status } from "../../../types";
import { authReducer } from "./auth";
import { fetchAuthMe, fetchUserData, registerUser } from "./thunk";

describe("Testing auth slice extra reducers", () => {
  it("should return updated profile when fetchAuthMe fulfilled", () => {
    const PROFILE_META = {
      _id: "161616",
      createdAt: "2016",
      email: "wwwthebest@gmail.com",
      token: "qwerty",
      updatedAt: "2023",
      username: "testmegatest",
    };

    const action = {
      type: fetchAuthMe.fulfilled.type,
      payload: PROFILE_META,
    };
    const result = authReducer(MOCK_OBJECT_ONE.auth, action);
    expect(result).toEqual({
      message: "",
      profile: PROFILE_META,
      status: "success",
    });
  });

  it("should return null profile when fetchAuthMe is loading", () => {
    const action = {
      type: fetchAuthMe.pending.type,
    };
    const result = authReducer(MOCK_OBJECT_ONE.auth, action);
    expect(result).toEqual({
      message: "",
      profile: null,
      status: Status.LOADING,
    });
  });

  it("should return null profile when fetchAuthMe rejected", () => {
    const action = {
      type: fetchAuthMe.rejected.type,
      payload: "Error",
    };
    const result = authReducer(MOCK_OBJECT_ONE.auth, action);
    expect(result).toEqual({
      message: "Error",
      profile: null,
      status: Status.ERROR,
    });
  });
});
