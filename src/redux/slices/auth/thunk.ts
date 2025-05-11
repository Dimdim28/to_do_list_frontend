import { createAsyncThunk } from '@reduxjs/toolkit';

import instanse from '../../../axios';

import { LoginParams, Profile, RegisterParams } from './types';

export const fetchUserData = createAsyncThunk<Profile, LoginParams>(
  'auth/fetchUserData',
  async (params, { rejectWithValue }) => {
    try {
      const response = await instanse.post('/auth/signin', params);
      const { token, email, isEmailVerified } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('emailForVerification', email);

      const me = await instanse.get('/user/me');
      return { ...me.data, token, isEmailVerified };
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

      const response = await instanse.post('/auth/signup', {
        username,
        password: firstPass,
        email,
      });

      const { token } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('emailForVerification', email);

      const me = await instanse.get('/user/me');
      return { ...me.data, token, isEmailVerified: false };
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  },
);

export const fetchAuthMe = createAsyncThunk<Profile>(
  'auth/fetchAuthMe',
  async () => {
    const token = localStorage.getItem('token');
    const { data } = await instanse.get('/user/me');
    return {
      ...data,
      token: token || '',
      isEmailVerified: data.isEmailVerified,
    };
  },
);

export const fetchGoogleUser = createAsyncThunk<Profile, string>(
  'auth/fetchGoogleUser',
  async (code, { rejectWithValue }) => {
    try {
      const response = await instanse.post('/auth/google', { code });
      const { token } = response.data;

      localStorage.setItem('token', token);

      const me = await instanse.get('/user/me');
      return { ...me.data, token, isEmailVerified: me.data.isEmailVerified };
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || 'Google login error',
      );
    }
  },
);

export const verifyEmail = createAsyncThunk<Profile, string>(
  'auth/verifyEmail',
  async (code, { rejectWithValue }) => {
    try {
      const response = await instanse.post(`/auth/verify-email/${code}`);
      const { token } = response.data;

      localStorage.setItem('token', token);
      localStorage.removeItem('emailForVerification');

      const me = await instanse.get('/user/me');
      return { ...me.data, token, isEmailVerified: true };
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || 'Email verification failed',
      );
    }
  },
);

export const resendEmailVerification = createAsyncThunk<void, string>(
  'auth/resendEmailVerification',
  async (email, { rejectWithValue }) => {
    try {
      await instanse.post('/auth/resend-email-verification', { email });
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Resend failed');
    }
  },
);
