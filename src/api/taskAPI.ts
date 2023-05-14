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
  deadline?: string | null;
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

export interface getTask {
  page?: number;
  limit?: number;
  createdAt?: string;
  updatedAt?: string;
  title?: string;
  description?: string;
  categories?: string[];
  deadline?: string | null;
  isCompleted?: boolean;
}

export interface Result {
  task: Task | null;
  status: Status;
  message?: string;
}

export interface TasksResult {
  tasks: Task[];
  status: Status;
  message?: string;
  totalPages?: number;
  currentPage?: number;
}

export type TasksResponse = {
  status: number;
  statusText: string;
  data: {
    tasks: Task[];
    totalPages: number;
    currentPage: number;
  };
};

class taskAPIClass {
  public async deleteTask(id: string): Promise<Result> {
    try {
      const response: TaskResponse = await instanse.delete(`/task/${id}`);
      return { task: response.data, status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err.response.data.message,
        status: Status.ERROR,
        task: null,
      };
    }
  }

  public async addtask(params: AddTask): Promise<Result> {
    const { title, description, categories, user, deadline, isCompleted } =
      params;
    try {
      console.log(params);
      const response: TaskResponse = await instanse.post("/task", {
        title,
        user,
        description,
        categories,
        deadline,
        isCompleted,
      });
      return { task: response.data, status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err.response.data.message,
        status: Status.ERROR,
        task: null,
      };
    }
  }

  public async edittask(params: EditTask): Promise<Result> {
    const { title, description, categories, _id, deadline, isCompleted } =
      params;
    try {
      const response: TaskResponse = await instanse.patch(`/task/${_id}`, {
        title,
        description,
        categories,
        deadline,
        isCompleted,
      });
      return { task: response.data, status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err.response.data.message,
        status: Status.ERROR,
        task: null,
      };
    }
  }

  public async getTasks(params?: getTask): Promise<TasksResult> {
    try {
      const response: TasksResponse = await instanse.get(`/task`, { params });
      const { tasks, currentPage, totalPages } = response.data;
      return { tasks, currentPage, totalPages, status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err.response.data.message,
        status: Status.ERROR,
        tasks: [],
      };
    }
  }
}
const taskAPI = new taskAPIClass();
export default taskAPI;
