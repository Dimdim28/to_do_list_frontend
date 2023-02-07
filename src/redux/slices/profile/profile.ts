import { fetchUserProfile } from "./thunk";
import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../../types";
import { ProfileSliceState } from "./types";

const initialState: ProfileSliceState = {
  data: null,
  status: Status.LOADING,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.status = Status.LOADING;
      state.data = null;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.data = null;
      state.message = String(action.payload);
    });
  },
});

export const profileReducer = profileSlice.reducer;
