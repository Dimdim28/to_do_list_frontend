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
  links?: string[];
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
        message: err?.response?.data?.message || "Error",
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
      return {
        message: err?.response?.data?.message || "Error",
        status: Status.ERROR,
        task: null,
      };
    }
  }

  public async edittask(params: EditTask): Promise<Result> {
    try {
      const { _id, ...body } = params;
      const response: TaskResponse = await instanse.patch(
        `/task/${params._id}`,
        body
      );
      return { task: response.data, status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || "Error",
        status: Status.ERROR,
        task: null,
      };
    }
  }

  public async getTasks(params?: getTask): Promise<TasksResult> {
    try {
      let newParams: any = params;
      const categories = params?.categories?.map((el) => `"${el}"`).join(",");

      if (categories) {
        newParams = { ...params, categories: `[${categories}]` };
      }
      const response: TasksResponse = await instanse.get(`/task`, {
        params: newParams,
      });
      const { tasks, currentPage, totalPages } = response.data;
      return { tasks, currentPage, totalPages, status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || "Error",
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
      return {
        message: err?.response?.data?.message || "Error",
        status: Status.ERROR,
      };
    }
  }

  public async addLinkToTask(
    id: string,
    prevLinks: string[],
    url: string
  ): Promise<Result> {
    try {
      const response: TaskResponse = await instanse.patch(`/task/${id}`, {
        links: [...prevLinks, url],
      });
      return { task: response.data, status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || "Error",
        status: Status.ERROR,
        task: null,
      };
    }
  }
}
const taskAPI = new taskAPIClass();
export default taskAPI;
