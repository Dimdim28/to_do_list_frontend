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
  ChangeName,
  DailyStats,
  StatsResponse,
} from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instanse from "../../../axios";
import { toast } from "react-toastify";

export const fetchUserProfile = createAsyncThunk<Profile, GetProfileParams>(
  "profile/fetchUserProfile",
  async (params, { rejectWithValue }) => {
    try {
      const response: ProfileResponse = await instanse.get(
        `/user/${params.id}`
      );
      const response2: any = await instanse.get("/upload");
      return {
        ...response.data,
        avatarUrl: response2.data[0].image,
      };
    } catch (err: any) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const changeAvatar = createAsyncThunk<Avatar, ChangeAvatarParams>(
  "profile/changeAvatar",
  async (params, { rejectWithValue }) => {
    try {
      const response: AvatarResponse = await instanse.post(`/upload`, {
        image: params.image,
      });

      const updatingAvatarUrlResult: UpdateProfileResponse = await instanse.get(
        `/upload`,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      if (updatingAvatarUrlResult.status !== 200) {
        return rejectWithValue(updatingAvatarUrlResult.data.message);
      }

      console.log(response.data);
      return response.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
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
      toast.error(err.response.data.message);
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
      toast.error(err.response.data.message);
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const changeName = createAsyncThunk<Message, ChangeName>(
  "profile/changeName",
  async (params, { rejectWithValue }) => {
    try {
      const result: UpdateProfileResponse = await instanse.patch(
        `/user/${params.userId}`,
        { username: params.username }
      );
      return result.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getStats = createAsyncThunk<DailyStats[]>(
  "profile/getStats",
  async (params, { rejectWithValue }) => {
    try {
      const recievedStats: StatsResponse = await instanse.get("/task/stats");
      return recievedStats.data;
    } catch (err: any) {
      toast.error(err.response.data.message);
      return rejectWithValue(err.response.data.message);
    }
  }
);
