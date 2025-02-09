import { createAsyncThunk } from '@reduxjs/toolkit';

import adminAPI from '../../../api/adminApi';
import instanse from '../../../axios';
import { Status } from '../../../types/shared';
import { Profile } from '../auth/types';

import {
  ChangeAvatarParams,
  ChangeName,
  ChangePassword,
  DailyStats,
  DeleteAccountResponse,
  GetProfileParams,
  Message,
  ProfileResponse,
  PublicAvatarResponse,
  StatsResponse,
  UpdateProfileResponse,
} from './types';

export const fetchUserProfile = createAsyncThunk<Profile, GetProfileParams>(
  'profile/fetchUserProfile',
  async (params, { rejectWithValue }) => {
    const { id } = params;
    const url = id ? `/user/profile/${id}` : '/user/me';
    try {
      const response: ProfileResponse = await instanse.get(url);
      return {
        ...response.data,
        avatarUrl: response.data.avatar,
      };
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  },
);

export const changeAvatar = createAsyncThunk<string, ChangeAvatarParams>(
  'profile/changeAvatar',
  async (params, { rejectWithValue }) => {
    try {
      const response: PublicAvatarResponse = await instanse.post(
        `/image/avatar`,
        params.image,
      );
      console.log(response);
      return response.data.url;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  },
);

export const deleteAccount = createAsyncThunk<void>(
  'profile/deleteAccount',
  async (_, { rejectWithValue }) => {
    try {
      const response: DeleteAccountResponse = await instanse.delete(`/user`);

      return response.data as any;
    } catch (err: any) {
      return rejectWithValue(err?.response?.message || 'Error');
    }
  },
);

export const changePass = createAsyncThunk<Message, ChangePassword>(
  'profile/changePassword',
  async (params, { rejectWithValue }) => {
    try {
      const passCheckingResult: DeleteAccountResponse = await instanse.post(
        '/user/password',
        { oldPassword: params.oldPassword, newPassword: params.newPassword },
      );

      if (passCheckingResult.status !== 200) {
        return rejectWithValue(passCheckingResult.data.status);
      }

      return passCheckingResult.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  },
);

export const changeName = createAsyncThunk<Profile, ChangeName>(
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
  },
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
  },
);

export const banUser = createAsyncThunk<
  { isBanned: boolean; status: Status },
  { id: string; isBanned: boolean }
>('admin/banUser', async ({ id, isBanned }, { rejectWithValue }) => {
  try {
    const recievedStats = await adminAPI.banUser(id, isBanned);
    return { status: recievedStats.status, isBanned };
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || 'Error');
  }
});
