import { OldUser } from '../shared';
import { SubTask } from './SubTask';

export enum NotificationType {
  SUBTASK_CONFIRMATION = 'subtask-confirmation',
}

export type Notification = {
  assignee: string;
  createdAt: string;
  subtaskId: SubTask;
  type: NotificationType;
  userId: OldUser;
  _id: string;
};
