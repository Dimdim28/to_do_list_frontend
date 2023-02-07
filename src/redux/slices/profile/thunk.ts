import { GetProfileParams, Profile, ProfileResponse } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instanse from "../../../axios";

export const fetchUserProfile = createAsyncThunk<Profile, GetProfileParams>(
  "profile/fetchUserProfile",
  async (id, { rejectWithValue }) => {
    try {
      const response: ProfileResponse = await instanse.get(`/auth${id}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
