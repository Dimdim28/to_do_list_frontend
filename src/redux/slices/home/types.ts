import { Category } from "../../../api/categoryAPI";
import { Status } from "../../../types";

export type CategoriesResponse = {
  data: Categories;
  status: number;
  statusText: string;
};

export type Categories = {
  categories: Category[];
  totalPages: number;
  currentPage: number;
  status: Status;
  message?: string;
};

export interface HomeSliceState {
  category: Categories;
}

export interface CategoriesParams {
  page?: number;
  limit?: number;
}
