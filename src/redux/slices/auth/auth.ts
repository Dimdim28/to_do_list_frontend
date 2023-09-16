import { createSlice } from "@reduxjs/toolkit";

import { fetchAuthMe, fetchUserData, registerUser } from "./thunk";
import { AuthSliceState } from "./types";
import { Status, Theme } from "../../../types";

const initialState: AuthSliceState = {
  profile: null,
  status: Status.LOADING,
  theme: (localStorage.getItem("theme") as Theme) || Theme.DARK,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.profile = null;
      window.localStorage.removeItem("token");
    },
    changeTheme(state, action) {
      state.theme = action.payload;
      window.localStorage.setItem("theme", action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = Status.LOADING;
      state.message = "";
      state.profile = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.message = "";
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.profile = null;
      state.message = String(action.payload);
    });
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = Status.LOADING;
      state.profile = null;
      state.message = "";
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.status = Status.SUCCESS;
      state.message = "";
    });
    builder.addCase(fetchAuthMe.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.profile = null;
      state.message = String(action.payload);
    });
    builder.addCase(registerUser.pending, (state) => {
      state.status = Status.LOADING;
      state.profile = null;
      state.message = "";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.status = Status.SUCCESS;
      state.message = "";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.profile = null;
      state.message = String(action.payload);
    });
  },
});

export const authReducer = authSlice.reducer;

export const { logout, changeTheme } = authSlice.actions;
