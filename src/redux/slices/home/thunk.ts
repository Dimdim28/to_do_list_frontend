import { createAsyncThunk } from '@reduxjs/toolkit';

import { getTask as TasksParams } from '../../../api/taskAPI';
import instanse from '../../../axios';

import { CategoriesParams, CategoriesResponse, TasksResponse } from './types';

export const fetchCategories = createAsyncThunk<
  CategoriesResponse,
  CategoriesParams
>('task/fetchCategories', async (params, { rejectWithValue }) => {
  try {
    const { limit, page } = params;
    const query = new URLSearchParams();
    if (limit !== undefined) query.append('limit', String(limit));
    if (page !== undefined) query.append('page', String(page));
    const url = `/category${query.toString() ? '?' + query.toString() : ''}`;
    const response = await instanse.get(url);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || 'Error');
  }
});

export const fetchTasks = createAsyncThunk<TasksResponse, TasksParams>(
  'task/fetchTasks',
  async (params, { rejectWithValue }) => {
    try {
      let newParams: any = params;
      const categories = params?.categories?.map((el) => `"${el}"`).join(',');
      if (categories) {
        newParams = { ...params, categories: `[${categories}]` };
      }
      const response = await instanse.get(`/task`, { params: newParams });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  },
);
