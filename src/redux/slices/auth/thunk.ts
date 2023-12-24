import { createAsyncThunk } from '@reduxjs/toolkit';

import { LoginParams, Profile, ProfileResponse, RegisterParams } from './types';
import instanse from '../../../axios';

export const fetchUserData = createAsyncThunk<Profile, LoginParams>(
  'auth/fetchUserData',
  async (params, { rejectWithValue }) => {
    try {
      const response: ProfileResponse = await instanse.post(
        '/user/signin',
        params,
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  },
);

export const registerUser = createAsyncThunk<Profile, RegisterParams>(
  'auth/registerUser',
  async (params, { rejectWithValue }) => {
    try {
      const { username, firstPass, email, secondPass } = params;

      if (firstPass !== secondPass) {
        return rejectWithValue('Passwords do not match');
      }

      const response: ProfileResponse = await instanse.post('/user/signup', {
        username,
        password: firstPass,
        email,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  },
);

export const fetchAuthMe = createAsyncThunk<Profile>(
  'auth/fetchAuthMe',
  async () => {
    const { data } = await instanse.get('/user/me');
    return data;
  },
);
