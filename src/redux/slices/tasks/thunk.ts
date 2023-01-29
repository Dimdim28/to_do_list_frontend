import { createAsyncThunk } from "@reduxjs/toolkit";
import instanse from "../../../axios";
import { Categories, CategoriesParams, CategoryResponse } from "./types";

export const fetchCategories = createAsyncThunk<Categories, CategoriesParams>(
  "task/fetchCategories",
  async (params, { rejectWithValue }) => {
    const { limit, page } = params;
    let url = "/category";
    if (limit || page) {
      url += "?";
      if (limit) url += "limit=" + limit;
      else {
        if (page && limit) url += "&page=" + page;
        else url += "page=" + page;
      }
    }

    try {
      const response: CategoryResponse = await instanse.get(url);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
