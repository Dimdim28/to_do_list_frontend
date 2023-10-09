import { createAsyncThunk } from '@reduxjs/toolkit';

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
} from './types';
import instanse from '../../../axios';

export const fetchUserProfile = createAsyncThunk<Profile, GetProfileParams>(
  'profile/fetchUserProfile',
  async (params, { rejectWithValue }) => {
    try {
      const response: ProfileResponse = await instanse.get(`/user/me`);
      const response2: any = await instanse.get('/image/avatar');
      return {
        ...response.data,
        avatarUrl: response2.data.image,
      };
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  }
);

export const changeAvatar = createAsyncThunk<Avatar, ChangeAvatarParams>(
  'profile/changeAvatar',
  async (params, { rejectWithValue }) => {
    try {
      const response: AvatarResponse = await instanse.post(`/image/avatar`, {
        image: params.image,
      });

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  }
);

export const deleteAccount = createAsyncThunk<Message, DeleteAccountParams>(
  'profile/deleteAccount',
  async (params, { rejectWithValue }) => {
    try {
      const response: DeleteAccountResponse = await instanse.delete(
        `/user/${params.id}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  }
);

export const changePass = createAsyncThunk<Message, ChangePassword>(
  'profile/changePassword',
  async (params, { rejectWithValue }) => {
    try {
      const passCheckingResult: DeleteAccountResponse = await instanse.post(
        '/user/password',
        { oldPassword: params.oldPassword, newPassword: params.newPassword }
      );

      if (passCheckingResult.status !== 200) {
        return rejectWithValue(passCheckingResult.data.message);
      }

      return passCheckingResult.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  }
);

export const changeName = createAsyncThunk<Message, ChangeName>(
  'profile/changeName',
  async (params, { rejectWithValue }) => {
    try {
      const result: UpdateProfileResponse = await instanse.patch(`/user`, {
        username: params.username,
      });
      return result.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  }
);

export const getStats = createAsyncThunk<DailyStats[]>(
  'profile/getStats',
  async (params, { rejectWithValue }) => {
    try {
      const recievedStats: StatsResponse = await instanse.post('/task/stats');
      return recievedStats.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  }
);
