import { LoginParams, Profile, ProfileResponse } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instanse from "../../../axios";

export const fetchUserData = createAsyncThunk<Profile, LoginParams>(
  "auth/fetchUserData",
  async (params, { rejectWithValue }) => {
    try {
      const response: ProfileResponse = await instanse.post("/auth", params);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await instanse.get("/auth/me");
  return data;
});
