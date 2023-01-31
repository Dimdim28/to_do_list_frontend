export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type CategoriesResponse = {
  data: Categories;
  status: number;
  statusText: string;
};

export type Category = {
  _id: string;
  title: string;
  user: string;
  color: string;
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
  task: {
    tasks: [];
    status: Status;
  };
}

export interface CategoriesParams {
  page?: number;
  limit?: number;
}