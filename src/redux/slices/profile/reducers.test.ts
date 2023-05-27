import {
  MOCK_OBJECT_ONE,
  MOCK_OBJECT_TWO,
  MOCK_OBJECT_THREE,
} from "../../../mocs/state";

import { profileReducer, exit, clearProfileErrorMessage } from "./profile";

describe("Testing profile slice reducers", () => {
  const exitAction = { type: exit.type };
  const clearProfileAction = { type: clearProfileErrorMessage.type };

  describe("exit reducer must works currectly", () => {
    beforeEach(() => {
      localStorage.setItem("token", "myToken");
    });

    it("Profile must be cleared after this reducer calling", () => {
      const firstResult = profileReducer(MOCK_OBJECT_ONE.profile, exitAction);
      const secondResult = profileReducer(MOCK_OBJECT_TWO.profile, exitAction);
      const thirdResult = profileReducer(MOCK_OBJECT_THREE.profile, exitAction);

      expect(firstResult.data).toBe(null);
      expect(secondResult.data).toBe(null);
      expect(thirdResult.data).toBe(null);
    });
  });
});