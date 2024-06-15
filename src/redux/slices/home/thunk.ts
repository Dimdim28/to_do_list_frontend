import { createAsyncThunk } from '@reduxjs/toolkit';

import instanse from '../../../axios';
import {
  Categories,
  CategoriesParams,
  CategoriesResponse,
  Tasks,
  TasksResponse,
} from './types';
import { getTask as TasksParams } from '../../../api/taskAPI';

export const fetchCategories = createAsyncThunk<Categories, CategoriesParams>(
  'task/fetchCategories',
  async (params, { rejectWithValue }) => {
    const { limit, page } = params;
    let url = '/category';
    if (limit || page) {
      url += '?';
      if (limit) url += 'limit=' + limit;
      else {
        if (page && limit) url += '&page=' + page;
        else url += 'page=' + page;
      }
    }

    try {
      const response: CategoriesResponse = await instanse.get(url);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  },
);

export const fetchTasks = createAsyncThunk<Tasks, TasksParams>(
  'task/fetchTasks',
  async (params, { rejectWithValue }) => {
    try {
      let newParams: any = params;
      const categories = params?.categories?.map((el) => `"${el}"`).join(',');

      if (categories) {
        newParams = { ...params, categories: `[${categories}]` };
      }
      const response: TasksResponse = await instanse.get(`/task`, {
        params: newParams,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || 'Error');
    }
  },
);
