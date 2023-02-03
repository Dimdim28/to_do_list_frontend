import { sendCategory } from "./thunk";
import { createSlice } from "@reduxjs/toolkit";
import { Status, HomeSliceState } from "./types";

const initialState: HomeSliceState = {
  category: null,
  status: Status.EMPTY,
};

const categorySlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearCategory(state) {
      state.category = null;
      state.status = Status.EMPTY;
      state.message = undefined;
    },
    setCategory(state, action) {
      state.category = { ...action.payload };
      state.status = Status.SUCCESS;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendCategory.pending, (state) => {
      state.status = Status.LOADING;
      state.message = undefined;
    });
    builder.addCase(sendCategory.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.category = { ...action.payload };
      state.message = undefined;
    });
    builder.addCase(sendCategory.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });
  },
});

export const categoryReducer = categorySlice.reducer;
export const { clearCategory, setCategory } = categorySlice.actions;
