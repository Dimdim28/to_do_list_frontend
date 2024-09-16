import { User } from '../shared';

import { SubTask } from './SubTask';

export enum NotificationType {
  SUBTASK_CONFIRMATION = 'subtask-confirmation',
  USER_ACCEPTED_SUBTASK = 'user-accepted-subtask',
  USER_REJECTED_SUBTASK = 'user-rejected-subtask',
}

export const TRANSLATION_NOTIFICATION_TYPES_COLLECTION: {
  [key: string]: string;
} = {
  'subtask-confirmation': 'subtaskConfirmation',
  subtaskConfirmed: 'userAcceptedSubtask',
  subtaskRejected: 'userRejectedSubtask',
  subtaskCompleted: 'userCompletedSubtask',
};

export enum NotificationServerEvents {
  NEW_SUBTASK_CONFIRMATION = 'newSubtaskConfitmation',
  DEL_SUBTASK_CONFIRMATION = 'delSubtaskConfirmation',
  NEW_NOTIFICATION = 'newNotification',
}

export enum NotificationClientEvents {
  SUBTASK_CONFIRM = 'subtaskConfirm',
  SUBTASK_REJECT = 'subtaskReject',
}

export type ConfirmNotification = {
  _id: string;
  assigneeId: string;
  subtaskId: SubTask;
  type: NotificationType.SUBTASK_CONFIRMATION;
  creator: User;
  createdAt: string;
};

export type Notification = {
  _id: string;
  userId: string;
  actionByUser: User;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  subtask: {
    title: string;
    description: string;
    _id: string;
  };
};
