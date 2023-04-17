import instanse from "../axios";
import { Status } from "../types";

export type TaskResponse = {
  status: number;
  statusText: string;
  data: Task;
};

type PureTask = {
  title: string;
  description: string;
  categories?: string[];
  deadline?: string;
  isCompleted?: boolean;
};

type User = {
  user: string;
};

type Id = {
  _id: string;
};

type Date = {
  createdAt: string;
  updatedAt: string;
};

interface EditTask extends PureTask, Id {}
interface AddTask extends PureTask, User {}
export interface Task extends PureTask, Id, User, Date {}

export interface Result {
  Task: Task | null;
  status: Status;
  message?: string;
}
