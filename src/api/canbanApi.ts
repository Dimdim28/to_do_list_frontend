import instanse from '../axios';
import { Column, ProjectShortInfo, Tag } from '../redux/slices/canban/type';
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

export type CreateBoardPayload = {
  title: string;
  description: string;
  userIds?: string[];
};

type CreateBoardResponseData = {
  _id: string;
  title: string;
  description: string;
  userId: string;
  userIds: string[];
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  columns: Column[];
};

type CreateBoardApiResponse = {
  data: CreateBoardResponseData;
  status: number;
  statusText: string;
};

export type CreateBoardResponseSuccess = {
  status: Status.SUCCESS;
  data: CreateBoardResponseData;
};

export type CreateBoardResponseFail = {
  status: Status.ERROR;
  data?: CreateBoardResponseData;
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

  //   public async getBoard(boardId: string): Promise<getBoardsResponse> {
  //     try {
  //       await instanse.get(`board/${boardId}`);
  //       return { status: Status.SUCCESS };
  //     } catch (err: any) {
  //       return {
  //         message: err?.response?.data?.message || 'Error',
  //         status: Status.ERROR,
  //       };
  //     }
  //   }

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
