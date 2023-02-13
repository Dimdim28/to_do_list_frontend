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
  ChangePassword,
  UpdateProfileResponse,
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

      const updatingAvatarUrlResult: UpdateProfileResponse =
        await instanse.patch(`/user/${params.userId}`, {
          avatarUrl: `http://localhost:5000${response.data.url}`,
        });
      if (updatingAvatarUrlResult.status !== 200) {
        return rejectWithValue(updatingAvatarUrlResult.data.message);
      }

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

export const changePass = createAsyncThunk<Message, ChangePassword>(
  "profile/changePassword",
  async (params, { rejectWithValue }) => {
    try {
      const passCheckingResult: DeleteAccountResponse = await instanse.post(
        "/password",
        { password: params.previous }
      );
      if (passCheckingResult.status !== 200) {
        return rejectWithValue(passCheckingResult.data.message);
      }
      const updatingPassResult: UpdateProfileResponse = await instanse.patch(
        `/user/${params.userId}`,
        { password: params.new }
      );
      return updatingPassResult.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response.data.message);
    }
  }
);
