import instanse from '../axios';
import { Category, Row } from '../redux/slices/roadmap/type';
import { Status } from '../types/shared';

import { RoadmapData } from './../redux/slices/roadmap/type';

export type RoadMapProjectShortInfo = {
  _id: string;
  title: string;
  description: string;
  creatorId: string;
  membersCount: number;
  updatedAt: string;
};

type ProjectFullInfo = RoadmapData;

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

type GetBoardResponseSuccess = {
  status: Status.SUCCESS;
  data: ProjectFullInfo;
};

type GetBoardResponseFail = {
  status: Status.ERROR;
  message: string;
};

type CreateBoardPayload = {
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

type UpdateBoardPayload = {
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

type DeleteBoardPayload = string;

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

export type CreateCategoryPayload = {
  roadmapId: string;
  title: string;
  color: string;
};

export type UpdateCategoryPayload = {
  roadmapId: string;
  categoryId: string;
  title?: string;
  color?: string;
};

export type DeleteCategoryPayload = {
  roadmapId: string;
  categoryId: string;
};

type CreateCategoryApiResponse = {
  data: Category;
  status: number;
  statusText: string;
};

type CreateCategoryResponseSuccess = {
  status: Status.SUCCESS;
  data: Category;
};

type CreateCategoryResponseFail = {
  status: Status.ERROR;
  message: string;
};

type UpdateCategoryResponseSuccess = {
  status: Status.SUCCESS;
};

type UpdateCategoryResponseFail = {
  status: Status.ERROR;
  message: string;
};

type DeleteCategoryResponseSuccess = {
  status: Status.SUCCESS;
};

type DeleteCategoryResponseFail = {
  status: Status.ERROR;
  message: string;
};

export type CreateRowPayload = {
  roadmapId: string;
  categoryId: string;
};

export type DeleteRowPayload = {
  roadmapId: string;
  categoryId: string;
  rowId: string;
};

type CreateRowApiResponse = {
  data: Row;
  status: number;
  statusText: string;
};

type CreateRowResponseSuccess = {
  status: Status.SUCCESS;
  data: Row;
};

type CreateRowResponseFail = {
  status: Status.ERROR;
  message: string;
};

type DeleteRowResponseSuccess = {
  status: Status.SUCCESS;
};

type DeleteRowResponseFail = {
  status: Status.ERROR;
  message: string;
};

export type Quarter = {
  _id: string;
  title: string;
  start: number;
  end: number;
};

export type CreateQuarterPayload = {
  roadmapId: string;
  title: string;
  start: number;
  end: number;
};

export type UpdateQuarterPayload = {
  roadmapId: string;
  quarterId: string;
  title?: string;
  start?: number;
  end?: number;
};

export type DeleteQuarterPayload = {
  roadmapId: string;
  quarterId: string;
};

type CreateQuarterApiResponse = {
  data: Quarter;
  status: number;
  statusText: string;
};

type CreateQuarterResponseSuccess = {
  status: Status.SUCCESS;
  data: Quarter;
};

type CreateQuarterResponseFail = {
  status: Status.ERROR;
  message: string;
};

type UpdateQuarterResponseSuccess = {
  status: Status.SUCCESS;
};

type UpdateQuarterResponseFail = {
  status: Status.ERROR;
  message: string;
};

type DeleteQuarterResponseSuccess = {
  status: Status.SUCCESS;
};

type DeleteQuarterResponseFail = {
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
  ): Promise<GetBoardResponseSuccess | GetBoardResponseFail> {
    try {
      const response: GetBoardApiResponse = await instanse.get(
        `roadmap/${boardId}`,
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

  public async createCategory(
    payload: CreateCategoryPayload,
  ): Promise<CreateCategoryResponseSuccess | CreateCategoryResponseFail> {
    try {
      const response: CreateCategoryApiResponse = await instanse.post(
        `roadmap/${payload.roadmapId}/category`,
        {
          title: payload.title,
          color: payload.color,
        },
      );
      return {
        status: Status.SUCCESS,
        data: response.data,
      };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error creating category',
      };
    }
  }

  public async updateCategory(
    payload: UpdateCategoryPayload,
  ): Promise<UpdateCategoryResponseSuccess | UpdateCategoryResponseFail> {
    try {
      await instanse.patch(
        `roadmap/${payload.roadmapId}/category/${payload.categoryId}`,
        {
          title: payload.title,
          color: payload.color,
        },
      );
      return { status: Status.SUCCESS };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error updating category',
      };
    }
  }

  public async deleteCategory(
    payload: DeleteCategoryPayload,
  ): Promise<DeleteCategoryResponseSuccess | DeleteCategoryResponseFail> {
    try {
      await instanse.delete(
        `roadmap/${payload.roadmapId}/category/${payload.categoryId}`,
      );
      return { status: Status.SUCCESS };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error deleting category',
      };
    }
  }

  public async createRow(
    payload: CreateRowPayload,
  ): Promise<CreateRowResponseSuccess | CreateRowResponseFail> {
    try {
      const response: CreateRowApiResponse = await instanse.post(
        `roadmap/${payload.roadmapId}/category/${payload.categoryId}/row`,
      );
      return {
        status: Status.SUCCESS,
        data: response.data,
      };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error creating row',
      };
    }
  }

  public async deleteRow(
    payload: DeleteRowPayload,
  ): Promise<DeleteRowResponseSuccess | DeleteRowResponseFail> {
    try {
      await instanse.delete(
        `roadmap/${payload.roadmapId}/category/${payload.categoryId}/row/${payload.rowId}`,
      );
      return { status: Status.SUCCESS };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error deleting row',
      };
    }
  }

  public async createQuarter(
    payload: CreateQuarterPayload,
  ): Promise<CreateQuarterResponseSuccess | CreateQuarterResponseFail> {
    try {
      const response: CreateQuarterApiResponse = await instanse.post(
        `roadmap/${payload.roadmapId}/quarter`,
        {
          title: payload.title,
          start: payload.start,
          end: payload.end,
        },
      );
      return {
        status: Status.SUCCESS,
        data: response.data,
      };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error creating quarter',
      };
    }
  }

  public async updateQuarter(
    payload: UpdateQuarterPayload,
  ): Promise<UpdateQuarterResponseSuccess | UpdateQuarterResponseFail> {
    try {
      await instanse.patch(
        `roadmap/${payload.roadmapId}/quarter/${payload.quarterId}`,
        {
          title: payload.title,
          start: payload.start,
          end: payload.end,
        },
      );
      return { status: Status.SUCCESS };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error updating quarter',
      };
    }
  }

  public async deleteQuarter(
    payload: DeleteQuarterPayload,
  ): Promise<DeleteQuarterResponseSuccess | DeleteQuarterResponseFail> {
    try {
      await instanse.delete(
        `roadmap/${payload.roadmapId}/quarter/${payload.quarterId}`,
      );
      return { status: Status.SUCCESS };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error deleting quarter',
      };
    }
  }
}

const roadmapAPI = new roadmapAPIClass();
export default roadmapAPI;
