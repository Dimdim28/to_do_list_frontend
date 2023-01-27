import { RootState } from "./../../store";

export const selectCategoryCurrentPage = (state: RootState) =>
  state.task.category.currentPage;
export const selectCategoryTotalPages = (state: RootState) =>
  state.task.category.totalPages;
export const selectCategories = (state: RootState) =>
  state.task.category.categories;
export const selectCategoriesStatus = (state: RootState) =>
  state.task.category.status;
export const selectCategoriesrError = (state: RootState) =>
  state.task.category.message;
