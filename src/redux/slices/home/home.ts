import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  Date,
  IsCompleted,
} from '../../../pages/Home/FiltersBar/Filters/Filters';
import { Category } from '../../../types/entities/Category';
import { SubTask } from '../../../types/entities/SubTask';
import { Task } from '../../../types/entities/Task';
import { Status } from '../../../types/shared';

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
    searchPattern: '',
    isCompleted: 'false',
    date: 'all',
    activeCategories: [],
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
    updateCategoryInList(state, action: PayloadAction<Category>) {
      for (const category of state.category.categories) {
        if (category._id === action.payload._id) {
          category.title = action.payload.title;
          category.color = action.payload.color;
        }
      }
    },
    updateCategoryInTasksList(state, action: PayloadAction<Category>) {
      for (const task of state.task.tasks) {
        for (const category of task.categories ?? []) {
          if (category._id === action.payload._id) {
            category.color = action.payload.color;
            category.title = action.payload.title;
          }
        }
      }
    },
    removeCategoryFromTasksList(state, action: PayloadAction<string>) {
      for (const task of state.task.tasks) {
        task.categories = (task.categories || [])?.filter(
          (el) => el._id !== action.payload,
        );
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
    removeCategoryFromList(state, action: PayloadAction<string>) {
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
      console.log(action.payload.isCompleted);
      const updatedTasks = state.task.tasks.map((el) =>
        el._id === action.payload.id
          ? { ...el, isCompleted: action.payload.isCompleted }
          : el,
      );

      state.task.tasks = updatedTasks;
    },
    addTaskToList(state, action: PayloadAction<Task>) {
      state.task.tasks = [...state.task.tasks, action.payload];
    },
    updateSubTaskInTask(
      state,
      action: PayloadAction<{ taskId: string; subTask: SubTask }>,
    ) {
      const { taskId, subTask } = action.payload;
      const taskInList = state.task.tasks.find((el) => el._id === taskId);
      if (taskInList) {
        taskInList.subtasks = taskInList.subtasks.map((el) =>
          el._id === subTask._id ? subTask : el,
        );
      }
    },
    updateMySubTaskInTasksList(
      state,
      action: PayloadAction<{
        _id: string;
        title?: string;
        description?: string;
        deadline?: string;
        isCompleted: boolean;
        links?: string[];
        categories?: Category[];
      }>,
    ) {
      const {
        _id,
        title,
        description,
        deadline,
        isCompleted,
        links,
        categories,
      } = action.payload;
      const taskInList = state.task.tasks.find((el) => el._id === _id);

      if (taskInList) {
        if (title) taskInList.title = title;
        if (description) taskInList.description = description;
        if (deadline !== undefined) taskInList.deadline = deadline;
        if (isCompleted !== undefined) taskInList.isCompleted = isCompleted;
        if (links) taskInList.links = [...links];
        if (categories) taskInList.categories = categories;
      }
    },
    removeMySubTaskFromTasksList(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.task.tasks = state.task.tasks.filter((el) => el._id !== id);
    },
    updateSubTaskCompletionStatusInSubtasksList(
      state,
      action: PayloadAction<{
        taskId?: string;
        subTaskId: string;
        isCompleted: boolean;
      }>,
    ) {
      const { taskId, subTaskId, isCompleted } = action.payload;
      if (taskId) {
        const taskInList = state.task.tasks.find((el) => el._id === taskId);
        if (taskInList) {
          taskInList.subtasks = taskInList.subtasks.map((el) =>
            el._id === subTaskId ? { ...el, isCompleted } : el,
          );
        }
      } else {
        for (const task of state.task.tasks) {
          for (const subTask of task.subtasks || []) {
            if (subTask._id === subTaskId) {
              subTask.isCompleted = isCompleted;
            }
          }
        }
      }
    },
    updateSubTaskIsRejectedStatusInSubtasksList(
      state,
      action: PayloadAction<{
        taskId?: string;
        subTaskId: string;
        isRejected: boolean;
      }>,
    ) {
      const { taskId, subTaskId, isRejected } = action.payload;
      if (taskId) {
        const taskInList = state.task.tasks.find((el) => el._id === taskId);
        if (taskInList) {
          taskInList.subtasks = taskInList.subtasks.map((el) =>
            el._id === subTaskId ? { ...el, isRejected } : el,
          );
        }
      } else {
        for (const task of state.task.tasks) {
          for (const subTask of task.subtasks || []) {
            if (subTask._id === subTaskId) {
              subTask.isRejected = isRejected;
            }
          }
        }
      }
    },
    removeSubTaskFromTask(
      state,
      action: PayloadAction<{ taskId: string; subTaskId: string }>,
    ) {
      const { taskId, subTaskId } = action.payload;
      const taskInList = state.task.tasks.find((el) => el._id === taskId);
      if (taskInList) {
        taskInList.subtasks = taskInList.subtasks.filter(
          (subtask) => subtask._id !== subTaskId,
        );
      }
    },
    addSubTaskToTask(
      state,
      action: PayloadAction<{ taskId: string; subTask: SubTask }>,
    ) {
      const { taskId, subTask } = action.payload;
      const taskInList = state.task.tasks.find((el) => el._id === taskId);
      if (taskInList) {
        taskInList.subtasks = [...taskInList.subtasks, subTask];
      }
    },
    addLinkToTask(state, action: PayloadAction<{ id: string; link: string }>) {
      const updatedTasks = state.task.tasks.map((el) =>
        el._id === action.payload.id
          ? { ...el, links: [...(el.links ?? []), action.payload.link] }
          : el,
      );

      state.task.tasks = updatedTasks;
    },
    removeTaskFromList(state, action: PayloadAction<string>) {
      state.task.tasks = state.task.tasks.filter(
        (el) => el._id !== action.payload,
      );
    },
    updateTaskInList(state, action: PayloadAction<Task>) {
      const updatedTask = action.payload;
      state.task.tasks = state.task.tasks.map((el) =>
        el._id === updatedTask._id ? updatedTask : el,
      );
    },
    updateTaskCurrentPage(state, action: PayloadAction<number>) {
      state.task.currentPage = action.payload;
    },
    updateTaskDate(state, action: PayloadAction<Date>) {
      state.task.date = action.payload;
    },
    updateTaskIsCompleted(state, action: PayloadAction<IsCompleted>) {
      state.task.isCompleted = action.payload;
    },
    updateTaskActiveCategories(state, action: PayloadAction<Category[]>) {
      state.task.activeCategories = action.payload;
    },
    updateTaskSearchPattern(state, action: PayloadAction<string>) {
      state.task.searchPattern = action.payload;
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
  updateCategoryInTasksList,
  addCategoryToList,
  removeCategoryFromList,
  removeCategoryFromTasksList,
  updateTaskCompletionStatus,
  updateTaskCurrentPage,
  updateTaskDate,
  removeTaskFromList,
  updateTaskInList,
  updateTaskIsCompleted,
  updateTaskActiveCategories,
  updateTaskSearchPattern,
  addTaskToList,
  addLinkToTask,
  updateSubTaskInTask,
  updateMySubTaskInTasksList,
  removeMySubTaskFromTasksList,
  updateSubTaskCompletionStatusInSubtasksList,
  updateSubTaskIsRejectedStatusInSubtasksList,
  removeSubTaskFromTask,
  addSubTaskToTask,
  clear,
} = homeSlice.actions;
