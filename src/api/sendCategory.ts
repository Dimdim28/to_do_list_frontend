import instanse from "../axios";

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

export interface Result {
  category: Category | null;
  status: Status;
  message?: string;
}

export const sendCategory = async (params: Category): Promise<Result> => {
  const { title, user, color, _id } = params;
  try {
    if (!_id) {
      const response: CategoryResponse = await instanse.post("/category", {
        title,
        user,
        color,
      });
      return { category: response.data, status: Status.SUCCESS };
    } else {
      const response: CategoryResponse = await instanse.patch(
        `/category/${_id}`,
        { title, color }
      );
      return { category: response.data, status: Status.SUCCESS };
    }
  } catch (err: any) {
    return {
      message: err.response.data.message,
      status: Status.ERROR,
      category: null,
    };
  }
};
