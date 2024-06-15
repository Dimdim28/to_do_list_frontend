import { RootState } from '../../store';

export const selectCategoryCurrentPage = (state: RootState) =>
  state.home.category.currentPage;
export const selectCategoryTotalPages = (state: RootState) =>
  state.home.category.totalPages;
export const selectCategories = (state: RootState) =>
  state.home.category.categories;
export const selectCategoriesStatus = (state: RootState) =>
  state.home.category.status;
export const selectCategoriesError = (state: RootState) =>
  state.home.category.message;
export const selectTaskCurrentPage = (state: RootState) =>
  state.home.task.currentPage;
export const selectTaskTotalPages = (state: RootState) =>
  state.home.task.totalPages;
export const selectTasks = (state: RootState) => state.home.task.tasks;
export const selectTasksStatus = (state: RootState) => state.home.task.status;
export const selectTasksError = (state: RootState) => state.home.task.message;
