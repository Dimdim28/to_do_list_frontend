import instanse from '../axios';
import { Notification } from '../types/entities/Notification';
import { Status } from '../types/shared';

type NotificationsResponse = {
  status: number;
  statusText: string;
  data: {
    results: Notification[];
    currentPage: number;
    totalPages: number;
  };
};

type NotificationResult = {
  notifications: Notification[];
  currentPage: number;
  totalPages: number;
  status: Status;
  message?: string;
};

type NotificationUpdateStatusResponse = {
  status: Status;
  message?: string;
};

class notificationsAPIClass {
  public async getNotifications(
    page?: number,
    limit?: number,
    skip?: number,
  ): Promise<NotificationResult> {
    try {
      const response: NotificationsResponse = await instanse.get(
        `/notification`,
        { params: { page, limit, skip } },
      );
      const { results, currentPage, totalPages } = response.data;
      return {
        notifications: results,
        currentPage,
        totalPages,
        status: Status.SUCCESS,
      };
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
  public async readNotification(
    notificationId: string,
    isRead?: boolean,
  ): Promise<NotificationUpdateStatusResponse> {
    try {
      await instanse.patch(`/notification/${notificationId}`, { isRead });
      return { status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
      };
    }
  }
}

const notificationsAPI = new notificationsAPIClass();
export default notificationsAPI;
