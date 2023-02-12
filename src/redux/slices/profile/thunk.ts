import {
  DeleteAccountParams,
  Avatar,
  AvatarResponse,
  ChangeAvatarParams,
  GetProfileParams,
  Profile,
  ProfileResponse,
  DeleteAccountResponse,
  Message,
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
      console.log(err);
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
      return response.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteAccount = createAsyncThunk<Message, DeleteAccountParams>(
  "profile/deleteAccount",
  async (params, { rejectWithValue }) => {
    try {
      const response: DeleteAccountResponse = await instanse.delete(
        `/user/${params.id}`
      );
      return response.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response.data.message);
    }
  }
);
