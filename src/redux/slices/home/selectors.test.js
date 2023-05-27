import {
    MOCK_OBJECT_ONE,
    MOCK_OBJECT_THREE,
    MOCK_OBJECT_TWO,
  } from "../../../mocs/state";
  
  import {
    selectCategoryCurrentPage,
    selectCategoryTotalPages,
    selectCategories,
    selectCategoriesStatus,
    selectCategoriesrError,
  } from "./selectors";
  
  import { Status } from "../../../types";
  
  describe("Testing home slice selectors", () => {
    it("selectCategoryCurrentPage must work correctly", () => {
      expect(selectCategoryCurrentPage(MOCK_OBJECT_ONE)).toBe(4);
      expect(selectCategoryCurrentPage(MOCK_OBJECT_TWO)).toBe(1);
      expect(selectCategoryCurrentPage(MOCK_OBJECT_THREE)).toBe(1);
    });

    it("selectCategoryTotalPages must work correctly", () => {
      expect(selectCategoryTotalPages(MOCK_OBJECT_ONE)).toBe(5);
      expect(selectCategoryTotalPages(MOCK_OBJECT_TWO)).toBe(0);
      expect(selectCategoryTotalPages(MOCK_OBJECT_THREE)).toBe(0);
    });
  });
  