import instanse from "../axios";
import { Status } from "../types";

export type CategoryResponse = {
  status: number;
  statusText: string;
  data: Category;
};

type PureCategory = {
  title: string;
  color: string;
};

type User = {
  user: string;
};

type Id = {
  _id: string;
};

interface EditCategory extends PureCategory, Id {}
interface AddCategory extends PureCategory, User {}
export interface Category extends PureCategory, Id, User {}

export interface Result {
  category: Category | null;
  status: Status;
  message?: string;
}

class categoryAPIClass {
  public async deleteCategory(id: string): Promise<Result> {
    try {
      const response: CategoryResponse = await instanse.delete(
        `/category/${id}`
      );
      return { category: response.data, status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err.response.data.message,
        status: Status.ERROR,
        category: null,
      };
    }
  }

  public async addCategory(params: AddCategory): Promise<Result> {
    const { title, user, color } = params;
    try {
      const response: CategoryResponse = await instanse.post("/category", {
        title,
        user,
        color,
      });
      return { category: response.data, status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err.response.data.message,
        status: Status.ERROR,
        category: null,
      };
    }
  }

  public async editCategory(params: EditCategory): Promise<Result> {
    const { title, color, _id } = params;
    try {
      const response: CategoryResponse = await instanse.patch(
        `/category/${_id}`,
        { title, color }
      );
      return { category: response.data, status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err.response.data.message,
        status: Status.ERROR,
        category: null,
      };
    }
  }
}
const categoryAPI = new categoryAPIClass();
export default categoryAPI;
