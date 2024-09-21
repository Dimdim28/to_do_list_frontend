import instanse from '../axios';
import { Status } from '../types/shared';

type banUserStatusResponse = {
  status: Status;
  message?: string;
};

class adminAPIClass {
  public async banUser(
    userId: string,
    isBanned: boolean,
  ): Promise<banUserStatusResponse> {
    try {
      await instanse.patch(`admin/user/${userId}/banStatus`, { isBanned });
      return { status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
      };
    }
  }
}

const adminAPI = new adminAPIClass();
export default adminAPI;
