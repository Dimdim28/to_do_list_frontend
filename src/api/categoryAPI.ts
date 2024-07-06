import instanse from '../axios';
import { Category } from '../types/entities/Category';
import { Status } from '../types/shared';

type CategoryResponse = {
  status: number;
  statusText: string;
  data: Category;
};

type CategoryResult = {
  category: Category | null;
  status: Status;
  message?: string;
};

interface EditCategory {
  _id: string;
  title: string;
  color: string;
}
interface AddCategory {
  user: string;
  title: string;
  color: string;
}

class categoryAPIClass {
  public async deleteCategory(id: string): Promise<CategoryResult> {
    try {
      const response: CategoryResponse = await instanse.delete(
        `/category/${id}`,
      );
      return { category: response.data, status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
        category: null,
      };
    }
  }

  public async addCategory(params: AddCategory): Promise<CategoryResult> {
    const { title, user, color } = params;
    try {
      const response: CategoryResponse = await instanse.post('/category', {
        title,
        user,
        color,
      });
      return { category: response.data, status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
        category: null,
      };
    }
  }

  public async editCategory(params: EditCategory): Promise<CategoryResult> {
    const { title, color, _id } = params;
    try {
      const response: CategoryResponse = await instanse.patch(
        `/category/${_id}`,
        { title, color },
      );
      return { category: response.data, status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
        category: null,
      };
    }
  }
}
const categoryAPI = new categoryAPIClass();
export default categoryAPI;
