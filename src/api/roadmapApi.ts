import instanse from '../axios';
import { Status } from '../types/shared';

export type RoadMapProjectShortInfo = {
  _id: string;
  title: string;
  description: string;
  creatorId: string;
  membersCount: number;
  updatedAt: string;
};

export type ProjectFullInfo = {
  type: '';
};

type GetBoardsApiResponse = {
  data: RoadMapProjectShortInfo[];
  status: number;
  statusText: string;
};

type GetBoardsResponse = {
  data: RoadMapProjectShortInfo[];
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
  data: RoadMapProjectShortInfo;
  status: number;
  statusText: string;
};

type CreateBoardResponseSuccess = {
  status: Status.SUCCESS;
  data: RoadMapProjectShortInfo;
};

type CreateBoardResponseFail = {
  status: Status.ERROR;
  message: string;
};

export type UpdateBoardPayload = {
  boardId: string;
  title: string;
  description: string;
};

type UpdateBoardApiResponse = {
  data: RoadMapProjectShortInfo;
  status: number;
  statusText: string;
};

type UpdateBoardResponseSuccess = {
  status: Status.SUCCESS;
  data: RoadMapProjectShortInfo;
};

type UpdateBoardResponseFail = {
  status: Status.ERROR;
  message: string;
};

export type DeleteBoardPayload = string;

type DeleteBoardApiResponse = {
  data: RoadMapProjectShortInfo;
  status: number;
  statusText: string;
};

type DeleteBoardResponseSuccess = {
  status: Status.SUCCESS;
  data: RoadMapProjectShortInfo;
};

type DeleteBoardResponseFail = {
  status: Status.ERROR;
  message: string;
};

class roadmapAPIClass {
  public async getBoards(): Promise<GetBoardsResponse> {
    try {
      const response: GetBoardsApiResponse = await instanse.get(`roadmap`);
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
        `roadmap`,
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

  public async updateBoard(
    payload: UpdateBoardPayload,
  ): Promise<UpdateBoardResponseSuccess | UpdateBoardResponseFail> {
    try {
      const response: UpdateBoardApiResponse = await instanse.patch(
        `roadmap/${payload.boardId}`,
        { title: payload.title, description: payload.description },
      );
      return { status: Status.SUCCESS, data: response.data };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error',
      };
    }
  }

  public async deleteBoard(
    payload: DeleteBoardPayload,
  ): Promise<DeleteBoardResponseSuccess | DeleteBoardResponseFail> {
    try {
      const response: DeleteBoardApiResponse = await instanse.delete(
        `roadmap/${payload}`,
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

const roadmapAPI = new roadmapAPIClass();
export default roadmapAPI;
