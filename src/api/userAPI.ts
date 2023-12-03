import instanse from '../axios';
import { Status } from '../types';

export type User = {
  _id: string;
  username: string;
  avatar: {
    url: string;
    public_id: string;
  } | null;
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
      return { users: response.data.foundUsers, status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
        users: [],
      };
    }
  }
}

const userAPI = new userAPIClass();
export default userAPI;
