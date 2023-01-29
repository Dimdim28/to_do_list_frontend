import { fetchAuthMe, fetchUserData, registerUser } from "./thunk";
import { AuthSliceState, Status } from "./types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthSliceState = {
  profile: null,
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.profile = null;
      window.localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = Status.LOADING;
      state.profile = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.profile = action.payload;
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
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchAuthMe.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.profile = null;
      state.message = String(action.payload);
    });
    builder.addCase(registerUser.pending, (state) => {
      state.status = Status.LOADING;
      state.profile = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.profile = null;
      state.message = String(action.payload);
    });
  },
});

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
