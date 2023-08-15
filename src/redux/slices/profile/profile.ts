import { createSlice } from "@reduxjs/toolkit";

import {
  changeAvatar,
  changePass,
  deleteAccount,
  fetchUserProfile,
  changeName,
  getStats,
} from "./thunk";
import { Status } from "../../../types";
import { ProfileSliceState } from "./types";

const initialState: ProfileSliceState = {
  data: null,
  status: Status.LOADING,
  stats: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    exit(state) {
      state.data = null;
    },
    clearProfileErrorMessage(state) {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.status = Status.LOADING;
      state.data = null;
      state.message = "";
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.data = action.payload;
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
      if (state.data)
        state.data = {
          ...state.data,
          avatarUrl: action.payload.url,
        };
      state.message = "";
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
      state.message = "";
    });
    builder.addCase(deleteAccount.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });

    builder.addCase(changePass.pending, (state) => {
      state.status = Status.LOADING;
      state.message = "";
    });
    builder.addCase(changePass.fulfilled, (state) => {
      state.status = Status.SUCCESS;
      state.message = "";
    });
    builder.addCase(changePass.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });

    builder.addCase(changeName.pending, (state) => {
      state.status = Status.LOADING;
      state.message = "";
    });
    builder.addCase(changeName.fulfilled, (state) => {
      state.status = Status.SUCCESS;
      state.message = "";
    });
    builder.addCase(changeName.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });
    builder.addCase(getStats.pending, (state) => {
      state.message = "";
    });
    builder.addCase(getStats.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.message = "";
      state.stats = action.payload;
    });
    builder.addCase(getStats.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });
  },
});

export const profileReducer = profileSlice.reducer;
export const { exit, clearProfileErrorMessage } = profileSlice.actions;
