import instanse from '../axios';
import { Status } from '../types';
import { SubTask } from './subTaskAPI';

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
  assigneeId?: string;
  userId?: {
    _id: string;
    username: string;
    avatar: {
      url: string;
      public_id: string;
    };
  };
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

type SubTasks = {
  subtasks: SubTask[];
};

interface EditTask extends PureTask, Id {}
interface AddTask extends PureTask, User {}
export interface Task extends PureTask, Id, User, Date, SubTasks {}

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
  searchPattern?: string;
}

export interface Result {
  task: Task | null;
  status: Status;
  message?: string;
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
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
        task: null,
      };
    }
  }

  public async addtask(params: AddTask): Promise<Result> {
    const { title, description, categories, user, deadline, isCompleted } =
      params;
    try {
      const response: TaskResponse = await instanse.post('/task', {
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
        message: err?.response?.data?.message || 'Error',
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
        body,
      );
      return { task: response.data, status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
        task: null,
      };
    }
  }

  public async shareTask(
    id: string,
    name: string,
    receiver: string,
  ): Promise<{ status: Status; message?: string }> {
    try {
      await instanse.post(`/task/share/${id}`, {
        shareFrom: name,
        shareTo: receiver,
      });
      return { status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
      };
    }
  }

  public async addLinkToTask(
    id: string,
    prevLinks: string[],
    url: string,
  ): Promise<Result> {
    try {
      const response: TaskResponse = await instanse.patch(`/task/${id}`, {
        links: [...prevLinks, url],
      });
      return { task: response.data, status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
        task: null,
      };
    }
  }
}
const taskAPI = new taskAPIClass();
export default taskAPI;
