import instanse from '../axios';
import { Status } from '../types/shared';

export type User = {
  _id: string;
  username: string;
  avatar: string;
};

export type FetchUsersResponse = {
  status: number;
  statusText: string;
  data: {
    foundUsers: User[];
    page: number;
    totalPages: number;
  };
};

class userAPIClass {
  public async getUsers(username: string, page?: number, limit?: number) {
    try {
      const response: FetchUsersResponse = await instanse.get(`/user`, {
        params: {
          username,
          page,
          limit,
        },
      });
      return {
        users: response.data.foundUsers,
        page: response.data.page || 1,
        totalPages: response.data.totalPages || 1,
        status: Status.SUCCESS,
      };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
        users: [],
        page: 1,
        totalPages: 1,
      };
    }
  }
}

const userAPI = new userAPIClass();
export default userAPI;
