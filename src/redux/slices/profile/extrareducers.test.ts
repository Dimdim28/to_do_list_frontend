import { MOCK_OBJECT_ONE } from "../../../mocs/state";
import { Status } from "../../../types";
import { profileReducer } from "./profile";
import { fetchUserProfile, changeAvatar, deleteAccount, changePass, changeName } from "./thunk";

describe("Testing profile slice extra reducers", () => {
  describe("fetchUserProfile extra reducers:", () => {
    it("should return updated profile when fetchUserProfile fulfilled", () => {
      const PROFILE_META = {
        _id: "431ggd91gdb9",
        createdAt: "2020",
        email: "bigpisos669@gmail.com",
        token: "yes",
        updatedAt: "2023",
        username: "kill",
      };

      const action = {
        type: fetchUserProfile.fulfilled.type,
        payload: PROFILE_META,
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        message: "",
        data: PROFILE_META,
        status: Status.SUCCESS,
      });
    });
  });
});
