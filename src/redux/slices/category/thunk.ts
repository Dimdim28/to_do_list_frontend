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
      console.log(response);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
