import {
  MOCK_OBJECT_ONE,
  MOCK_OBJECT_THREE,
  MOCK_OBJECT_TWO,
} from "../../../mocs/state";

import { clearProfileErrorMessage,exit, profileReducer } from "./profile";

describe("Testing profile slice reducers", () => {
  const exitAction = { type: exit.type };
  const clearProfileErrorMessageAction = { type: clearProfileErrorMessage.type };

  describe("exit reducer must works currectly", () => {
    it("Profile must be cleared after this reducer calling", () => {
      const firstResult = profileReducer(MOCK_OBJECT_ONE.profile, exitAction);
      const secondResult = profileReducer(MOCK_OBJECT_TWO.profile, exitAction);
      const thirdResult = profileReducer(MOCK_OBJECT_THREE.profile, exitAction);

      expect(firstResult.data).toBe(null);
      expect(secondResult.data).toBe(null);
      expect(thirdResult.data).toBe(null);
    });
  });

  describe("clearProfileErrorMessage reducer must works currectly", () => {
    it("Profile error message must be cleared after this reducer calling", () => {
      const firstResult = profileReducer(MOCK_OBJECT_ONE.profile, clearProfileErrorMessageAction);
      const secondResult = profileReducer(MOCK_OBJECT_TWO.profile, clearProfileErrorMessageAction);
      const thirdResult = profileReducer(MOCK_OBJECT_THREE.profile, clearProfileErrorMessageAction);

      expect(firstResult.message).toBe("");
      expect(secondResult.message).toBe("");
      expect(thirdResult.message).toBe("");
    });
  });
});