import {
  MOCK_OBJECT_ONE,
  MOCK_OBJECT_TWO,
  MOCK_OBJECT_THREE,
} from "../../../mocs/state";

import {
  clearCategories,
  updateCategoryInList,
  addCategoryToList,
  removeCategoryFromList,
  clear,
  homeReducer,
} from "./home";

import { HomeSliceState } from "./types";
import { Status } from "../../../types";

describe("Testing home slice reducers", () => {
  const clearAction = { type: clear.type };

  describe("clear reducer must works currectly", () => {
    it("All slice must be cleared after this reducer calling", () => {
      const firstResult = homeReducer(MOCK_OBJECT_ONE.home, clearAction);
      const secondResult = homeReducer(MOCK_OBJECT_TWO.home, clearAction);
      const thirdResult = homeReducer(MOCK_OBJECT_THREE.home, clearAction);
      const initialState: HomeSliceState = {
        category: {
          categories: [],
          totalPages: 0,
          currentPage: 1,
          status: Status.LOADING,
        },
      };

      expect(firstResult).toEqual(initialState);
      expect(secondResult).toEqual(initialState);
      expect(thirdResult).toEqual(initialState);
    });
  });
});
