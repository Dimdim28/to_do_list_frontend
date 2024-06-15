import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Status } from '../../../types';
import { fetchCategories, fetchTasks } from './thunk';
import { HomeSliceState } from './types';

const initialState: HomeSliceState = {
  category: {
    categories: [],
    totalPages: 0,
    currentPage: 1,
    status: Status.LOADING,
  },
  task: {
    tasks: [],
    totalPages: 0,
    currentPage: 1,
    status: Status.LOADING,
  },
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    clear: () => initialState,
    clearCategories(state) {
      state.category.categories = [];
    },
    updateCategoryInList(state, action) {
      for (const category of state.category.categories) {
        if (category._id === action.payload._id) {
          category.title = action.payload.title;
          category.color = action.payload.color;
        }
      }
    },
    addCategoryToList(state, action) {
      const { currentPage, totalPages, categories } = state.category;
      if (totalPages === 0 || currentPage === 0) {
        categories.push(action.payload);
        state.category.totalPages = 1;
        state.category.currentPage = 1;
      } else if (currentPage === totalPages) {
        categories.push(action.payload);
        if (categories.length > currentPage * 10) {
          ++state.category.totalPages;
          ++state.category.currentPage;
        }
      }
    },
    removeCategoryFromList(state, action) {
      const { currentPage, totalPages, categories } = state.category;
      if (currentPage !== 0) {
        const categoryIndex = categories.findIndex(
          (category) => category._id === action.payload,
        );
        state.category.categories.splice(categoryIndex, 1);
        if (categories.length < (currentPage - 1) * 10 + 1) {
          --state.category.currentPage;
          state.category.totalPages =
            totalPages === 1 ? totalPages : totalPages - 1;
        }
      }
    },
    updateTaskCompletionStatus(
      state,
      action: PayloadAction<{ id: string; isCompleted: boolean }>,
    ) {
      const updatedTasks = state.task.tasks.map((el) =>
        el._id === action.payload.id
          ? { ...el, isCompleted: action.payload.isCompleted }
          : el,
      );

      state.task.tasks = updatedTasks;
    },
    updateTaskCurrentPage(state, action: PayloadAction<number>) {
      state.task.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.category.status = Status.LOADING;
      state.category.message = '';
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.category.categories = [
        ...state.category.categories,
        ...(action.payload?.categories || []),
      ];
      state.category.message = '';
      state.category.status = Status.SUCCESS;
      state.category.totalPages = action.payload.totalPages;
      state.category.currentPage = Number(action.payload.currentPage);
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.category.status = Status.ERROR;
      state.category.message = String(action.payload);
    });
    builder.addCase(fetchTasks.pending, (state) => {
      state.task.status = Status.LOADING;
      state.task.message = '';
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.task.tasks = action.payload.tasks;
      state.task.status = Status.SUCCESS;
      state.task.totalPages = action.payload.totalPages;
      state.task.currentPage = Number(action.payload.currentPage);
      state.task.message = '';
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.task.status = Status.ERROR;
      state.task.message = String(action.payload);
    });
  },
});

export const homeReducer = homeSlice.reducer;
export const {
  clearCategories,
  updateCategoryInList,
  addCategoryToList,
  removeCategoryFromList,
  updateTaskCompletionStatus,
  updateTaskCurrentPage,
  clear,
} = homeSlice.actions;
