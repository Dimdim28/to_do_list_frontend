import { toast } from "react-toastify";
import instanse from "../axios";
import { Status } from "../types";

export type Category = {
  _id: string;
  title: string;
  color: string;
};

export type TaskResponse = {
  status: number;
  statusText: string;
  data: Task;
};

type PureTask = {
  title?: string;
  description?: string;
  categories?: Category[];
  deadline?: string | null;
  isCompleted?: boolean;
  sharedWith?: string[] | { userId: string; username: string }[];
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
  categories?: Category[];
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
      toast.error(err.response.data.message);
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
      toast.error(err.response.data.message);
      return {
        message: err.response.data.message,
        status: Status.ERROR,
        task: null,
      };
    }
  }

  public async edittask(params: EditTask): Promise<Result> {
    try {
      const response: TaskResponse = await instanse.patch(
        `/task/${params._id}`,
        params
      );
      return { task: response.data, status: Status.SUCCESS };
    } catch (err: any) {
      toast.error(err.response.data.message);
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
      toast.error(err.response.data.message);
      return {
        message: err.response.data.message,
        status: Status.ERROR,
        tasks: [],
      };
    }
  }

  public async shareTask(
    id: string,
    name: string,
    receiver: string
  ): Promise<{ status: Status; message?: string }> {
    try {
      await instanse.post(`/task/share/${id}`, {
        shareFrom: name,
        shareTo: receiver,
      });
      return { status: Status.SUCCESS };
    } catch (err: any) {
      toast.error(err.response.data.message);
      return {
        message: err.response.data.message,
        status: Status.ERROR,
      };
    }
  }
}
const taskAPI = new taskAPIClass();
export default taskAPI;
