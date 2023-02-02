import { RootState } from "../../store";

export const selectCategoryCurrentPage = (state: RootState) =>
  state.home.category.currentPage;
export const selectCategoryTotalPages = (state: RootState) =>
  state.home.category.totalPages;
export const selectCategories = (state: RootState) =>
  state.home.category.categories;
export const selectCategoriesStatus = (state: RootState) =>
  state.home.category.status;
export const selectCategoriesrError = (state: RootState) =>
  state.home.category.message;
