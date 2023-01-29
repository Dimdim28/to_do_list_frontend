import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./thunk";
import { Status, TasksSliceState } from "./types";

const initialState: TasksSliceState = {
  task: {
    tasks: [],
    status: Status.LOADING,
  },
  category: {
    categories: [],
    totalPages: 0,
    currentPage: 1,
    status: Status.LOADING,
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearCategories(state) {
      state.category.categories = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.category.status = Status.LOADING;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.category.categories = [
        ...state.category.categories,
        ...action.payload.categories,
      ];
      state.category.status = Status.SUCCESS;
      state.category.totalPages = action.payload.totalPages;
      state.category.currentPage = Number(action.payload.currentPage);
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.category.status = Status.ERROR;
      state.category.categories = [];
      state.category.message = String(action.payload);
    });
  },
});

export const taskReducer = tasksSlice.reducer;
export const { clearCategories } = tasksSlice.actions;
