import instanse from '../axios';
import { ProjectFullInfo, ProjectShortInfo } from '../redux/slices/canban/type';
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
  userIds?: string[];
};

type CreateBoardApiResponse = {
  data: ProjectFullInfo;
  status: number;
  statusText: string;
};

type CreateBoardResponseSuccess = {
  status: Status.SUCCESS;
  data: ProjectFullInfo;
};

type CreateBoardResponseFail = {
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
}

const canbanAPI = new canbanAPIClass();
export default canbanAPI;
