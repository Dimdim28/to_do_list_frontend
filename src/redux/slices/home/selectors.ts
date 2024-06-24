import { getTask } from '../../../api/taskAPI';
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
export const selectTasksSearchPattern = (state: RootState) =>
  state.home.task.searchPattern;
export const selectTasksIsCompleted = (state: RootState) =>
  state.home.task.isCompleted;
export const selectTasksDate = (state: RootState) => state.home.task.date;
export const selectTasksActiveCategories = (state: RootState) =>
  state.home.task.activeCategories;
export const selectTaskFetchingParams = (state: RootState): getTask => {
  const page = state.home.task.currentPage;
  const deadline = state.home.task.date;
  const categories = state.home.task.activeCategories;
  const searchPattern = state.home.task.searchPattern;
  const isCompleted = state.home.task.isCompleted;

  const fetchingParams: getTask = {
    page,
    deadline,
    categories,
    searchPattern,
  };

  if (isCompleted !== 'all') {
    if (isCompleted === 'false') {
      fetchingParams.isCompleted = false;
    } else {
      fetchingParams.isCompleted = true;
    }
  }
  return fetchingParams;
};
export const selectTasks = (state: RootState) => state.home.task.tasks;
export const selectTasksStatus = (state: RootState) => state.home.task.status;
export const selectTasksError = (state: RootState) => state.home.task.message;
