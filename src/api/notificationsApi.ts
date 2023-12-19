import instanse from '../axios';
import { Status } from '../types';

export type NotificationsResponse = {
  status: number;
  statusText: string;
  data: Notification[];
};

export enum NotificationType {
  SUBTASK_CONFIRMATION = 'subtask-confirmation',
}

export type Notification = {
  assigneeId: string;
  createdAt: string;
  subtaskId: string | null;
  type: NotificationType;
  userId: {
    avatar: {
      public_id: string;
      url: string;
    };
    username: string;
    _id: string;
  };
  _id: string;
};

export interface Result {
  notifications: Notification[] | null;
  status: Status;
  message?: string;
}

class notificationsAPIClass {
  public async getNotifications(): Promise<Result> {
    try {
      const response: NotificationsResponse =
        await instanse.get(`/notification`);
      return { notifications: response.data, status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
        notifications: null,
      };
    }
  }
}

const notificationsAPI = new notificationsAPIClass();
export default notificationsAPI;
