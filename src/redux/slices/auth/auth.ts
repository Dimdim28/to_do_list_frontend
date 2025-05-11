import { createSlice } from '@reduxjs/toolkit';

import socketsAPI from '../../../api/socketsAPI';
import { Language, Status, Theme } from '../../../types/shared';

import {
  fetchAuthMe,
  fetchGoogleUser,
  fetchUserData,
  registerUser,
  verifyEmail,
} from './thunk';
import { AuthSliceState } from './types';

const initialState: AuthSliceState = {
  profile: null,
  status: Status.LOADING,
  theme: (localStorage.getItem('theme') as Theme) || Theme.DARK,
  lang: (localStorage.getItem('lang') as Language) || Language.EN,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.profile = null;
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('theme');
      window.localStorage.removeItem('lang');
    },
    changeTheme(state, action) {
      state.theme = action.payload;
      window.localStorage.setItem('theme', action.payload);
    },
    changeLang(state, action) {
      state.lang = action.payload;
      window.localStorage.setItem('lang', action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      console.log('fetchUserData pending');
      state.status = Status.LOADING;
      state.message = '';
      state.profile = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      console.log('fetchUserData fulfilled', action.payload);
      state.profile = action.payload;
      state.message = '';
      state.status =
        action.payload.isEmailVerified === false
          ? Status.NEEDS_EMAIL_VERIFICATION
          : Status.SUCCESS;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      console.log('fetchUserData rejected', action.payload);
      state.status = Status.ERROR;
      state.profile = null;
      state.message = String(action.payload);
    });
    builder.addCase(fetchAuthMe.pending, (state) => {
      console.log('fetchAuthMe pending');
      state.status = Status.LOADING;
      state.profile = null;
      state.message = '';
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      console.log('fetchAuthMe fulfilled', action.payload);
      state.profile = action.payload;
      state.status =
        action.payload.isEmailVerified === false
          ? Status.NEEDS_EMAIL_VERIFICATION
          : Status.SUCCESS;
      state.message = '';
      socketsAPI.init(window.localStorage.getItem('token') || '');
    });
    builder.addCase(fetchAuthMe.rejected, (state, action) => {
      console.log('fetchAuthMe rejected', action.payload);
      state.status = Status.UNAUTHORIZED;
      state.profile = null;
      state.message = String(action.payload);
    });
    builder.addCase(registerUser.pending, (state) => {
      console.log('fetchAuthMe pending');
      state.status = Status.LOADING;
      state.profile = null;
      state.message = '';
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      console.log('fetchAuthMe fulfilled', action.payload);
      state.profile = action.payload;
      state.status =
        action.payload.isEmailVerified === false
          ? Status.NEEDS_EMAIL_VERIFICATION
          : Status.SUCCESS;
      state.message = '';
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      console.log('fetchAuthMe rejected', action.payload);
      state.status = Status.ERROR;
      state.profile = null;
      state.message = String(action.payload);
    });
    builder.addCase(fetchGoogleUser.pending, (state) => {
      console.log('fetchGoogleUser pending');
      state.status = Status.LOADING;
      state.message = '';
      state.profile = null;
    });
    builder.addCase(fetchGoogleUser.fulfilled, (state, action) => {
      console.log('fetchGoogleUser fulfilled', action.payload);
      state.profile = action.payload;
      state.status =
        action.payload.isEmailVerified === false
          ? Status.NEEDS_EMAIL_VERIFICATION
          : Status.SUCCESS;
      state.message = '';
    });
    builder.addCase(fetchGoogleUser.rejected, (state, action) => {
      console.log('fetchGoogleUser rejected', action.payload);
      state.status = Status.ERROR;
      state.profile = null;
      state.message = String(action.payload);
    });

    builder.addCase(verifyEmail.pending, (state) => {
      state.status = Status.LOADING;
      state.message = '';
    });
    builder.addCase(verifyEmail.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.status = Status.SUCCESS;
      state.message = '';
    });
    builder.addCase(verifyEmail.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.profile = null;
      state.message = String(action.payload);
    });
  },
});

export const authReducer = authSlice.reducer;

export const { logout, changeTheme, changeLang } = authSlice.actions;
