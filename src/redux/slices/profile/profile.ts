import { changeAvatar, deleteAccount, fetchUserProfile } from "./thunk";
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
      state.message = "";
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
    builder.addCase(changeAvatar.pending, (state) => {
      state.status = Status.LOADING;
      state.message = "";
    });
    builder.addCase(changeAvatar.fulfilled, (state, action) => {
      console.log("fulfilled");
      if (state.data)
        state.data = {
          ...state.data,
          avatarUrl: `http://localhost:5000${action.payload.url}`,
        };

      state.status = Status.SUCCESS;
    });
    builder.addCase(changeAvatar.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });

    builder.addCase(deleteAccount.pending, (state) => {
      state.status = Status.LOADING;
      state.message = "";
    });
    builder.addCase(deleteAccount.fulfilled, (state) => {
      state.data = null;
      state.status = Status.SUCCESS;
    });
    builder.addCase(deleteAccount.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });
  },
});

export const profileReducer = profileSlice.reducer;
