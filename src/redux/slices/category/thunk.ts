import { createAsyncThunk } from "@reduxjs/toolkit";
import instanse from "../../../axios";
import { Category, CategoryResponse } from "./types";

export const sendCategory = createAsyncThunk<Category, Category>(
  "category/sendCategory",
  async (params, { rejectWithValue }) => {
    const { title, user, color, _id } = params;
    try {
      if (user && !_id) {
        const response: CategoryResponse = await instanse.post("/category", {
          title,
          user,
          color,
        });
        return response.data;
      } else {
        const response: CategoryResponse = await instanse.patch(
          `/category/${_id}`,
          { title, color }
        );
        return response.data;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
