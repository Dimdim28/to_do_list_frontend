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

class subTasksAPIClass {
  public async createSubTask({
    taskId,
    title,
    description,
    assigneeId,
    isCompleted,
    deadline,
  }: CreateSubTaskParams) {
    try {
      await instanse.post(`/task/${taskId}/subtask`, {
        title,
        description,
        assigneeId,
        isCompleted,
        deadline,
      });
      return { status: Status.SUCCESS };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
        users: [],
      };
    }
  }
}

const subTasksAPI = new subTasksAPIClass();
export default subTasksAPI;
