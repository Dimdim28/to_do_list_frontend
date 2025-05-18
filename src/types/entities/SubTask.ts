import { User } from '../shared';

export type SubTask = {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isConfirmed: boolean;
  isRejected: boolean;
  deadline: string | null;
  dateOfCompletion: string | null;
  assignee: User;
};
