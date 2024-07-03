import instanse from '../axios';
import { Status } from '../types';

export type CreateSubTaskResponse = {
  status: number;
  statusText: string;
};

interface CreateSubTaskParams {
  taskId: string;
  title: string;
  description: string;
  assigneeId: string;
  isCompleted?: boolean;
  deadline?: string | null;
}

export type SubTask = {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  deadline: string;
  rejected: boolean;
  assignee: {
    _id: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type SubTaskResponse = {
  status: number;
  statusText: string;
  data: SubTask;
};

export interface Result {
  task: SubTask | null;
  status: Status;
  message?: string;
}

interface EditSubTaskParams {
  subTaskId: string;
  title?: string;
  description?: string;
  assigneeId?: string;
  isCompleted?: boolean;
  deadline?: string | null;
  links?: string[];
  rejected?: boolean;
  categories?: string[];
}

class subTasksAPIClass {
  public async createSubTask({
    taskId,
    title,
    description,
    assigneeId,
    isCompleted,
    deadline,
  }: CreateSubTaskParams): Promise<Result> {
    try {
      const response: SubTaskResponse = await instanse.post(
        `/task/${taskId}/subtask`,
        {
          title,
          description,
          assigneeId,
          isCompleted,
          deadline,
        },
      );
      return { status: Status.SUCCESS, task: response.data };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
        task: null,
      };
    }
  }

  public async editSubTask({
    subTaskId,
    title,
    description,
    links,
    assigneeId,
    isCompleted,
    deadline,
    rejected,
    categories,
  }: EditSubTaskParams): Promise<Result> {
    try {
      const response = await instanse.patch(`/subtask/${subTaskId}`, {
        title,
        description,
        assigneeId,
        isCompleted,
        deadline,
        links,
        rejected,
        categories,
      });
      return { status: Status.SUCCESS, task: response.data };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
        task: null,
      };
    }
  }

  public async deleteSubTask(subTaskId: string): Promise<Result> {
    try {
      const response: SubTaskResponse = await instanse.delete(
        `/subtask/${subTaskId}`,
      );
      return { status: Status.SUCCESS, task: response.data };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
        task: null,
      };
    }
  }

  public async addLinkToSubTask(
    id: string,
    prevLinks: string[],
    url: string,
  ): Promise<Result> {
    try {
      const response: SubTaskResponse = await instanse.patch(`/subtask/${id}`, {
        links: [...prevLinks, url],
      });
      return { status: Status.SUCCESS, task: response.data };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
        task: null,
      };
    }
  }
}

const subTasksAPI = new subTasksAPIClass();
export default subTasksAPI;
