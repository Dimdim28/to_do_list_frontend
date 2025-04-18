import instanse from '../axios';
import {
  Category,
  Milestone,
  Quarter,
  Row,
  Task,
} from '../redux/slices/roadmap/type';
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

export type CreateMilestonePayload = {
  roadmapId: string;
  title: string;
  position: number;
};

export type UpdateMilestonePayload = {
  roadmapId: string;
  milestoneId: string;
  title?: string;
  position?: number;
};

export type DeleteMilestonePayload = {
  roadmapId: string;
  milestoneId: string;
};

type CreateMilestoneApiResponse = {
  data: Milestone;
  status: number;
  statusText: string;
};

type CreateMilestoneResponseSuccess = {
  status: Status.SUCCESS;
  data: Milestone;
};

type CreateMilestoneResponseFail = {
  status: Status.ERROR;
  message: string;
};

type UpdateMilestoneResponseSuccess = {
  status: Status.SUCCESS;
};

type UpdateMilestoneResponseFail = {
  status: Status.ERROR;
  message: string;
};

type DeleteMilestoneResponseSuccess = {
  status: Status.SUCCESS;
};

type DeleteMilestoneResponseFail = {
  status: Status.ERROR;
  message: string;
};

export type CreateTaskPayload = {
  roadmapId: string;
  categoryId: string;
  rowId: string;
  title: string;
  progress?: number;
  start?: number;
  end?: number;
};

export type UpdateTaskPayload = {
  roadmapId: string;
  categoryId: string;
  rowId: string;
  taskId: string;
  title?: string;
  progress?: number;
  start?: number;
  end?: number;
};

export type DeleteTaskPayload = {
  roadmapId: string;
  categoryId: string;
  rowId: string;
  taskId: string;
};

type CreateTaskApiResponse = {
  data: Task;
  status: number;
  statusText: string;
};

type CreateTaskResponseSuccess = {
  status: Status.SUCCESS;
  data: Task;
};

type CreateTaskResponseFail = {
  status: Status.ERROR;
  message: string;
};

type UpdateTaskResponseSuccess = {
  status: Status.SUCCESS;
};

type UpdateTaskResponseFail = {
  status: Status.ERROR;
  message: string;
};

type DeleteTaskResponseSuccess = {
  status: Status.SUCCESS;
};

type DeleteTaskResponseFail = {
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

  public async createMilestone(
    payload: CreateMilestonePayload,
  ): Promise<CreateMilestoneResponseSuccess | CreateMilestoneResponseFail> {
    try {
      const response: CreateMilestoneApiResponse = await instanse.post(
        `roadmap/${payload.roadmapId}/milestone`,
        {
          title: payload.title,
          position: payload.position,
        },
      );
      return {
        status: Status.SUCCESS,
        data: response.data,
      };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error creating milestone',
      };
    }
  }

  public async updateMilestone(
    payload: UpdateMilestonePayload,
  ): Promise<UpdateMilestoneResponseSuccess | UpdateMilestoneResponseFail> {
    try {
      await instanse.patch(
        `roadmap/${payload.roadmapId}/milestone/${payload.milestoneId}`,
        {
          title: payload.title,
          position: payload.position,
        },
      );
      return { status: Status.SUCCESS };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error updating milestone',
      };
    }
  }

  public async deleteMilestone(
    payload: DeleteMilestonePayload,
  ): Promise<DeleteMilestoneResponseSuccess | DeleteMilestoneResponseFail> {
    try {
      await instanse.delete(
        `roadmap/${payload.roadmapId}/milestone/${payload.milestoneId}`,
      );
      return { status: Status.SUCCESS };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error deleting milestone',
      };
    }
  }

  public async createTask(
    payload: CreateTaskPayload,
  ): Promise<CreateTaskResponseSuccess | CreateTaskResponseFail> {
    try {
      const response: CreateTaskApiResponse = await instanse.post(
        `roadmap/${payload.roadmapId}/category/${payload.categoryId}/row/${payload.rowId}/task`,
        {
          title: payload.title,
          progress: payload.progress,
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
        message: err?.response?.data?.message || 'Error creating task',
      };
    }
  }

  public async updateTask(
    payload: UpdateTaskPayload,
  ): Promise<UpdateTaskResponseSuccess | UpdateTaskResponseFail> {
    try {
      await instanse.patch(
        `roadmap/${payload.roadmapId}/category/${payload.categoryId}/row/${payload.rowId}/task/${payload.taskId}`,
        {
          title: payload.title,
          progress: payload.progress,
          start: payload.start,
          end: payload.end,
        },
      );
      return { status: Status.SUCCESS };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error updating task',
      };
    }
  }

  public async deleteTask(
    payload: DeleteTaskPayload,
  ): Promise<DeleteTaskResponseSuccess | DeleteTaskResponseFail> {
    try {
      await instanse.delete(
        `roadmap/${payload.roadmapId}/category/${payload.categoryId}/row/${payload.rowId}/task/${payload.taskId}`,
      );
      return { status: Status.SUCCESS };
    } catch (err: any) {
      return {
        status: Status.ERROR,
        message: err?.response?.data?.message || 'Error deleting task',
      };
    }
  }
}

const roadmapAPI = new roadmapAPIClass();
export default roadmapAPI;
