import instanse from '../axios';
import {
  Column,
  ProjectFullInfo,
  ProjectShortInfo,
  Tag,
} from '../redux/slices/canban/type';
import { Status } from '../types/shared';

type GetBoardsApiResponse = {
  data: ProjectShortInfo[];
  status: number;
  statusText: string;
};

type GetBoardsResponse = {
  data: ProjectShortInfo[];
  message?: string;
  status: Status;
};

type GetBoardApiResponse = {
  data: ProjectFullInfo;
  status: number;
  statusText: string;
};

export type GetBoardResponseSuccess = {
  status: Status.SUCCESS;
  data: ProjectFullInfo;
};

export type GetBoardResponseFail = {
  status: Status.ERROR;
  message: string;
};

export type CreateBoardPayload = {
  title: string;
  description: string;
};

type CreateBoardApiResponse = {
  data: ProjectShortInfo;
  status: number;
  statusText: string;
};

type CreateBoardResponseSuccess = {
  status: Status.SUCCESS;
  data: ProjectShortInfo;
};

type CreateBoardResponseFail = {
  status: Status.ERROR;
  message: string;
};

export type CreateColumnPayload = {
  title: string;
  boardId: string;
};

type CreateColumnApiResponse = {
  data: Column;
  status: number;
  statusText: string;
};

type CreateColumnResponseSuccess = {
  status: Status.SUCCESS;
  data: Column;
};

type CreateColumnResponseFail = {
  status: Status.ERROR;
  message: string;
};

export type UpdateColumnPayload = {
  title: string;
  boardId: string;
  columnId: string;
  order?: number;
};

type UpdateColumnApiResponse = {
  data: { success: true };
  status: number;
  statusText: string;
};

type UpdateColumnResponseSuccess = {
  status: Status.SUCCESS;
  data: { success: true };
};

type UpdateColumnResponseFail = {
  status: Status.ERROR;
  message: string;
};

export type DeleteColumnPayload = {
  boardId: string;
  columnId: string;
};

type DeleteColumnApiResponse = {
  data: { success: true };
  status: number;
  statusText: string;
};

type DeleteColumnResponseSuccess = {
  status: Status.SUCCESS;
  data: { success: true };
};

type DeleteColumnResponseFail = {
  status: Status.ERROR;
  message: string;
};

export type CreateTaskPayload = {
  boardId: string;
  columnId: string;
  title: string;
  description?: string;
  assigneeIds?: string[];
  tagIds?: string[];
};

type CreateTaskApiResponse = {
  data: {
    _id: string;
    title: string;
    description: string;
    assignees?: {
      _id: string;
    }[];
    tags?: {
      _id: string;
    }[];
    order?: number;
  };
  status: number;
  statusText: string;
};

type CreateTaskResponseSuccess = {
  status: Status.SUCCESS;
  data: {
    _id: string;
    title: string;
    description: string;
    assignees?: {
      _id: string;
    }[];
    tags?: {
      _id: string;
    }[];
    order?: number;
  };
};

type CreateTaskResponseFail = {
  status: Status.ERROR;
  message: string;
};

export type UpdateTaskPayload = {
  boardId: string;
  columnId: string;
  taskId: string;
  title?: string;
  description?: string;
  assigneeIds?: string[];
  tagIds?: string[];
};

type UpdateTaskApiResponse = {
  data: { success: true };
  status: number;
  statusText: string;
};

type UpdateTaskResponseSuccess = {
  status: Status.SUCCESS;
  data: { success: true };
};

type UpdateTaskResponseFail = {
  status: Status.ERROR;
  message: string;
};

export type AddUserPayload = {
  boardId: string;
  targetUserId: string;
};

type AddUserApiResponse = {
  data: { success: true };
  status: number;
  statusText: string;
};

type AddUserResponseSuccess = {
  status: Status.SUCCESS;
  data: { success: true };
};

type AddUserResponseFail = {
  status: Status.ERROR;
  message: string;
};

export type RemoveUserPayload = {
  boardId: string;
  targetUserId: string;
};

type RemoveUserApiResponse = {
  data: { success: true };
  status: number;
  statusText: string;
};

type RemoveUserResponseSuccess = {
  status: Status.SUCCESS;
  data: { success: true };
};

type RemoveUserResponseFail = {
  status: Status.ERROR;
  message: string;
};

export type CreateTagPayload = {
  boardId: string;
  title: string;
  color: string;
};

type CreateTagApiResponse = {
  data: Tag;
  status: number;
  statusText: string;
};

type CreateTagResponseSuccess = {
  status: Status.SUCCESS;
  data: Tag;
};

type CreateTagResponseFail = {
  status: Status.ERROR;
  message: string;
};

class canbanAPIClass {
  public async getBoards(): Promise<GetBoardsResponse> {
    try {
      const response: GetBoardsApiResponse = await instanse.get(`board`);
      return { status: Status.SUCCESS, data: response.data };
    } catch (err: any) {
      return {
        data: [],
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
      };
    }
  }

  public async getBoard(
    boardId: string,
  ): Promise<GetBoardResponseSuccess | CreateBoardResponseFail> {
    try {
      const response: GetBoardApiResponse = await instanse.get(
        `board/${boardId}`,
      );

      return {
        status: Status.SUCCESS,
        data: response.data,
      };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error',
      };
    }
  }

  public async createBoard(
    payload: CreateBoardPayload,
  ): Promise<CreateBoardResponseSuccess | CreateBoardResponseFail> {
    try {
      const response: CreateBoardApiResponse = await instanse.post(
        `board`,
        payload,
      );
      return { status: Status.SUCCESS, data: response.data };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error',
      };
    }
  }

  public async createColumn(
    payload: CreateColumnPayload,
  ): Promise<CreateColumnResponseSuccess | CreateColumnResponseFail> {
    try {
      const response: CreateColumnApiResponse = await instanse.post(
        `board/${payload.boardId}/column`,
        { title: payload.title },
      );
      return { status: Status.SUCCESS, data: response.data };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error',
      };
    }
  }

  public async updateColumn(
    payload: UpdateColumnPayload,
  ): Promise<UpdateColumnResponseSuccess | UpdateColumnResponseFail> {
    try {
      const response: UpdateColumnApiResponse = await instanse.patch(
        `board/${payload.boardId}/column/${payload.columnId}`,
        { title: payload.title },
      );
      return { status: Status.SUCCESS, data: response.data };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error',
      };
    }
  }

  public async deleteColumn(
    payload: DeleteColumnPayload,
  ): Promise<DeleteColumnResponseSuccess | DeleteColumnResponseFail> {
    try {
      const response: DeleteColumnApiResponse = await instanse.delete(
        `board/${payload.boardId}/column/${payload.columnId}`,
      );
      return { status: Status.SUCCESS, data: response.data };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error',
      };
    }
  }

  public async createTask(
    payload: CreateTaskPayload,
  ): Promise<CreateTaskResponseSuccess | CreateTaskResponseFail> {
    try {
      const response: CreateTaskApiResponse = await instanse.post(
        `board/${payload.boardId}/column/${payload.columnId}/task`,
        {
          title: payload.title,
          description: payload.description,
          assigneeIds: payload.assigneeIds,
          tagIds: payload.tagIds,
        },
      );
      return { status: Status.SUCCESS, data: response.data };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error',
      };
    }
  }

  public async updateTask(
    payload: UpdateTaskPayload,
  ): Promise<UpdateTaskResponseSuccess | UpdateTaskResponseFail> {
    try {
      const response: UpdateTaskApiResponse = await instanse.patch(
        `board/${payload.boardId}/column/${payload.columnId}/task/${payload.taskId}`,
        {
          title: payload.title,
          description: payload.description,
          assigneeIds: payload.assigneeIds,
          tagIds: payload.tagIds,
        },
      );
      return { status: Status.SUCCESS, data: response.data };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error',
      };
    }
  }

  public async addUser(
    payload: AddUserPayload,
  ): Promise<AddUserResponseSuccess | AddUserResponseFail> {
    try {
      const response: AddUserApiResponse = await instanse.post(
        `board/${payload.boardId}/add-user/${payload.targetUserId}`,
      );
      return { status: Status.SUCCESS, data: response.data };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error',
      };
    }
  }

  public async removeUser(
    payload: RemoveUserPayload,
  ): Promise<RemoveUserResponseSuccess | RemoveUserResponseFail> {
    try {
      const response: RemoveUserApiResponse = await instanse.post(
        `board/${payload.boardId}/remove-user/${payload.targetUserId}`,
      );
      return { status: Status.SUCCESS, data: response.data };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error',
      };
    }
  }

  public async createTag(
    payload: CreateTagPayload,
  ): Promise<CreateTagResponseSuccess | CreateTagResponseFail> {
    try {
      const response: CreateTagApiResponse = await instanse.post(
        `board/${payload.boardId}/tag`,
        { title: payload.title, color: payload.color },
      );
      return { status: Status.SUCCESS, data: response.data };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error',
      };
    }
  }
}

const canbanAPI = new canbanAPIClass();
export default canbanAPI;
