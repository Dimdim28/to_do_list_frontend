import instanse from '../axios';
import {
  Column,
  ProjectFullInfo,
  ProjectShortInfo,
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
}

const canbanAPI = new canbanAPIClass();
export default canbanAPI;
