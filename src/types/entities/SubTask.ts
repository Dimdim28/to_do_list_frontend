import { Avatar } from '../shared';

export type SubTask = {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  deadline: string;
  isRejected: boolean;
  isConfirmed: boolean;
  assignee: Avatar;
  createdAt: string;
  updatedAt: string;
};
