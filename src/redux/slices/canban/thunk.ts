import { createAsyncThunk } from '@reduxjs/toolkit';

import canbanAPI, { CreateBoardPayload } from '../../../api/canbanApi';
import { Status } from '../../../types/shared';

import { ProjectShortInfo } from './type';

export const fetchAllCanBanBoards = createAsyncThunk<ProjectShortInfo[]>(
  'canban/fetchBoards',
  async (_, { rejectWithValue }) => {
    try {
      const response = await canbanAPI.getBoards();

      if (response.status === Status.SUCCESS) {
        return response.data;
      } else {
        return rejectWithValue(response.message || 'Unknown error');
      }
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  },
);

export const createCanBanBoard = createAsyncThunk<
  ProjectShortInfo,
  CreateBoardPayload
>('canban/createBoard', async (payload, { rejectWithValue }) => {
  try {
    const response = await canbanAPI.createBoard(payload);

    if (response.status === Status.SUCCESS) {
      const newBoard = response.data;

      return {
        _id: newBoard._id,
        title: newBoard.title,
        description: newBoard.description,
        membersCount: newBoard.userIds.length,
        createdAt: newBoard.createdAt,
        updatedAt: newBoard.updatedAt,
        isOwner: true,
      };
    } else {
      return rejectWithValue(response.message || 'Unknown error');
    }
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || 'Error');
  }
});
