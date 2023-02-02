export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type CategoryResponse = {
  status: number;
  statusText: string;
  data: Category;
};

export type Category = {
  _id?: string;
  title: string;
  user?: string;
  color: string;
};

export interface HomeSliceState {
  category: Category | null;
  status: Status;
  message?: string;
}
