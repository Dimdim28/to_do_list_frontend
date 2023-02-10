import {
  Avatar,
  AvatarResponse,
  ChangeAvatarParams,
  GetProfileParams,
  Profile,
  ProfileResponse,
} from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instanse from "../../../axios";

export const fetchUserProfile = createAsyncThunk<Profile, GetProfileParams>(
  "profile/fetchUserProfile",
  async (params, { rejectWithValue }) => {
    try {
      const response: ProfileResponse = await instanse.get(
        `/user/${params.id}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const changeAvatar = createAsyncThunk<Avatar, ChangeAvatarParams>(
  "profile/changeAvatar",
  async (params, { rejectWithValue }) => {
    try {
      const response: AvatarResponse = await instanse.post(
        `/upload`,
        params.image
      );
      console.log(response);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
