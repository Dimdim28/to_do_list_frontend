import { createAsyncThunk } from '@reduxjs/toolkit';

import canbanAPI, {
  CreateBoardPayload,
  CreateColumnPayload,
  DeleteColumnPayload,
  UpdateColumnPayload,
} from '../../../api/canbanApi';
import { Status } from '../../../types/shared';

import { Column, ProjectFullInfo, ProjectShortInfo } from './type';

export const fetchAllCanBanBoards = createAsyncThunk<
  { results: ProjectShortInfo[]; page: number; totalPages: number },
  number | undefined
>('canban/fetchBoards', async (page = 1, { rejectWithValue }) => {
  try {
    const response = await canbanAPI.getBoards(page);

    console.log(response.status);
    if (response.status === Status.SUCCESS) {
      return {
        results: response.data.results,
        page: response.data.page,
        totalPages: response.data.totalPages,
      };
    } else {
      return rejectWithValue(response.message || 'Unknown error');
    }
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || 'Error');
  }
});

export const fetchCanBanBoardById = createAsyncThunk<ProjectFullInfo, string>(
  'canban/fetchBoardById',
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await canbanAPI.getBoard(boardId);

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
        membersCount: newBoard.membersCount,
        createdAt: newBoard.createdAt,
        updatedAt: newBoard.updatedAt,
        creatorId: newBoard.creatorId,
      };
    } else {
      return rejectWithValue(response.message || 'Unknown error');
    }
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || 'Error');
  }
});

export const createCanBanColumn = createAsyncThunk<Column, CreateColumnPayload>(
  'canban/createColumn',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await canbanAPI.createColumn(payload);

      if (response.status === Status.SUCCESS) {
        const data = response.data;

        return data;
      } else {
        return rejectWithValue(response.message || 'Unknown error');
      }
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  },
);

export const updateCanBanColumn = createAsyncThunk<Column, UpdateColumnPayload>(
  'canban/updateColumn',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await canbanAPI.updateColumn(payload);

      if (response.status === Status.SUCCESS) {
        return {
          _id: payload.columnId,
          order: 0,
          tasks: [],
          title: payload.title || '',
        };
      } else {
        return rejectWithValue(response.message || 'Unknown error');
      }
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  },
);

export const deleteCanBanColumn = createAsyncThunk<string, DeleteColumnPayload>(
  'canban/deleteColumn',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await canbanAPI.deleteColumn(payload);

      if (response.status === Status.SUCCESS) {
        return payload.columnId;
      } else {
        return rejectWithValue(response.message || 'Unknown error');
      }
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  },
);
