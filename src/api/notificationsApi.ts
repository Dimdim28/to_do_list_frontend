import instanse from '../axios';
import { Status } from '../types';
import { SubTask } from './subTaskAPI';

export type NotificationsResponse = {
  status: number;
  statusText: string;
  data: {
    notifications: Notification[];
    currentPage: number;
    totalPages: number;
  };
};

export enum NotificationType {
  SUBTASK_CONFIRMATION = 'subtask-confirmation',
}

export type Notification = {
  assigneeId: string;
  createdAt: string;
  subtaskId: SubTask;
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
  notifications: Notification[];
  currentPage: number;
  totalPages: number;
  status: Status;
  message?: string;
}

class notificationsAPIClass {
  public async getNotifications(
    page?: number,
    limit?: number,
    skip?: number,
  ): Promise<Result> {
    try {
      const response: NotificationsResponse = await instanse.get(
        `/notification`,
        { params: { page, limit, skip } },
      );
      const { notifications, currentPage, totalPages } = response.data;
      return { notifications, currentPage, totalPages, status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
        notifications: [],
        currentPage: 0,
        totalPages: 1,
      };
    }
  }
}

const notificationsAPI = new notificationsAPIClass();
export default notificationsAPI;
