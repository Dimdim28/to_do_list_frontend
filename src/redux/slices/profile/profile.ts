import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProfileEffect, Status } from '../../../types/shared';
import { Profile } from '../auth/types';

import {
  banUser,
  changeAvatar,
  changeName,
  changePass,
  deleteAccount,
  fetchUserProfile,
  getStats,
} from './thunk';
import { ProfileSliceState } from './types';

const initialState: ProfileSliceState = {
  data: null,
  status: Status.LOADING,
  stats: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    exit(state) {
      state.data = null;
    },
    clearProfileErrorMessage(state) {
      state.message = '';
    },
    updateProfileEffect(state, action: PayloadAction<ProfileEffect>) {
      if (!state.data) return;

      state.data.profileEffect = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.status = Status.LOADING;
      state.data = null;
      state.message = '';
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.data = null;
      state.message = String(action.payload);
    });

    builder.addCase(changeAvatar.pending, (state) => {
      state.status = Status.LOADING;
      state.message = '';
    });
    builder.addCase(changeAvatar.fulfilled, (state, action) => {
      if (state.data)
        state.data = {
          ...state.data,
          avatar: action.payload,
        };
      state.message = '';
      state.status = Status.SUCCESS;
    });
    builder.addCase(changeAvatar.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });

    builder.addCase(deleteAccount.pending, (state) => {
      state.status = Status.LOADING;
      state.message = '';
    });
    builder.addCase(deleteAccount.fulfilled, (state) => {
      state.data = null;
      state.status = Status.SUCCESS;
      state.message = '';
    });
    builder.addCase(deleteAccount.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });

    builder.addCase(changePass.pending, (state) => {
      state.status = Status.LOADING;
      state.message = '';
    });
    builder.addCase(changePass.fulfilled, (state) => {
      state.status = Status.SUCCESS;
      state.message = '';
    });
    builder.addCase(changePass.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });

    builder.addCase(changeName.pending, (state) => {
      state.status = Status.LOADING;
      state.message = '';
    });
    builder.addCase(
      changeName.fulfilled,
      (state, action: PayloadAction<Profile>) => {
        state.status = Status.SUCCESS;
        state.message = '';
        if (state.data) {
          state.data.username = action.payload.username;
        }
      },
    );
    builder.addCase(changeName.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });
    builder.addCase(getStats.pending, (state) => {
      state.message = '';
    });
    builder.addCase(getStats.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.message = '';
      state.stats = action.payload;
    });
    builder.addCase(getStats.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });
    builder.addCase(banUser.pending, (state) => {
      state.status = Status.LOADING;
      state.message = '';
    });
    builder.addCase(banUser.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.message = '';
      if (action.payload.status === Status.SUCCESS) {
        if (state?.data?.isBanned !== undefined) {
          state.data.isBanned = action.payload.isBanned;
        }
      }
    });
    builder.addCase(banUser.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });
  },
});

export const profileReducer = profileSlice.reducer;
export const { exit, clearProfileErrorMessage, updateProfileEffect } =
  profileSlice.actions;
