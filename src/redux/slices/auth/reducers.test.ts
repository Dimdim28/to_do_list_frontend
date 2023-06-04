import {
  MOCK_OBJECT_ONE,
  MOCK_OBJECT_TWO,
  MOCK_OBJECT_THREE,
} from "../../../mocs/state";
import { authReducer, logout } from "./auth";

describe("Testing auth slice reducers", () => {
  const logOutAction = { type: logout.type };

  describe("logout reducer must works currectly", () => {
    beforeEach(() => {
      localStorage.setItem("token", "myToken");
    });

    it("Profile must be cleared after this reducer calling", () => {
      const firstResult = authReducer(MOCK_OBJECT_ONE.auth, logOutAction);
      const secondResult = authReducer(MOCK_OBJECT_TWO.auth, logOutAction);
      const thirdResult = authReducer(MOCK_OBJECT_THREE.auth, logOutAction);

      expect(firstResult.profile).toBe(null);
      expect(secondResult.profile).toBe(null);
      expect(thirdResult.profile).toBe(null);
    });

    describe("Token should be removed from localStorage this reducer calling", () => {
      it("should work correctly for the authorised user", () => {
        authReducer(MOCK_OBJECT_ONE.auth, logOutAction);
        expect(localStorage.getItem("token")).toBe(null);
      });
      it("should work correctly for the user with error", () => {
        authReducer(MOCK_OBJECT_TWO.auth, logOutAction);
        expect(localStorage.getItem("token")).toBe(null);
      });

      it("should work correctly for the user with loading", () => {
        authReducer(MOCK_OBJECT_THREE.auth, logOutAction);
        expect(localStorage.getItem("token")).toBe(null);
      });
    });
  });
});
