import { createCategory } from "./thunk";
import { createSlice } from "@reduxjs/toolkit";
import { Status, HomeSliceState } from "./types";

const initialState: HomeSliceState = {
  category: {},
  status: Status.LOADING,
};

const categorySlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearCategory(state) {
      state.category = {};
      state.status = Status.LOADING;
    },
    setCategory(state, action) {
      state.category = { ...action.payload };
      state.status = Status.SUCCESS;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCategory.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.category = { ...action.payload };
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });
  },
});

export const categoryReducer = categorySlice.reducer;
export const { clearCategory, setCategory } = categorySlice.actions;
