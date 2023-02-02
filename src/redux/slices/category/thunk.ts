import { createAsyncThunk } from "@reduxjs/toolkit";
import instanse from "../../../axios";
import { Category, CategoryResponse } from "./types";

export const createCategory = createAsyncThunk<Category, Category>(
  "category/createCategory",
  async (params, { rejectWithValue }) => {
    try {
      const response: CategoryResponse = await instanse.post(
        "/category",
        params
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updateCategory = createAsyncThunk<Category, Category>(
  "category/updateCategory",
  async (params, { rejectWithValue }) => {
    const { title, color } = params;
    try {
      const response: CategoryResponse = await instanse.patch(
        `/category/${params._id}`,
        { title, color }
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
