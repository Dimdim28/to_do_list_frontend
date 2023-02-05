import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./thunk";
import { Status, HomeSliceState } from "./types";

const initialState: HomeSliceState = {
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

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
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
      if (totalPages === 0) {
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
          (category) => category._id === action.payload
        );
        console.log(categoryIndex);
        state.category.categories.splice(categoryIndex, 1);
        if (categories.length < (currentPage - 1) * 10 + 1) {
          --state.category.currentPage;
          state.category.totalPages =
            totalPages === 1 ? totalPages : totalPages - 1;
        }
      }
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
      state.category.message = String(action.payload);
    });
  },
});

export const homeReducer = homeSlice.reducer;
export const {
  clearCategories,
  updateCategoryInList,
  addCategoryToList,
  removeCategoryFromList,
} = homeSlice.actions;
