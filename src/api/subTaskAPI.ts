import instanse from '../axios';
import { SubTask } from '../types/entities/SubTask';
import { Status } from '../types/shared';

type SubTaskResponse = {
  status: number;
  statusText: string;
  data: SubTask;
};

type SubTaskResult = {
  task: SubTask | null;
  status: Status;
  message?: string;
};

interface CreateSubTaskParams {
  taskId: string;
  title: string;
  description: string;
  assigneeId: string;
  isCompleted?: boolean;
  deadline?: string | null;
}

interface EditSubTaskParams {
  subTaskId: string;
  title?: string;
  description?: string;
  assigneeId?: string;
  isCompleted?: boolean;
  deadline?: string | null;
  links?: string[];
  isRejected?: boolean;
  isConfirmed?: boolean;
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
  }: CreateSubTaskParams): Promise<SubTaskResult> {
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
    isRejected,
    isConfirmed,
    categories,
  }: EditSubTaskParams): Promise<SubTaskResult> {
    try {
      const response = await instanse.patch(`/subtask/${subTaskId}`, {
        title,
        description,
        assigneeId,
        isCompleted,
        deadline,
        links,
        isRejected,
        isConfirmed,
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

  public async deleteSubTask(subTaskId: string): Promise<SubTaskResult> {
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
  ): Promise<SubTaskResult> {
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
