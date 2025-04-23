import { Status, User } from '../../../types/shared';

export type CanBanSliceState = {
  data: CanBanState;
  status: Status;
  message?: string;
};

export type SelectedTaskInfo = {
  task: Task | null;
  columnId?: string;
  indexInColumn?: number;
};

export type Tag = {
  _id: string;
  title: string;
  color: string;
};

export type ProjectShortInfo = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  membersCount: number;
};

export type CanBanState = {
  columns: Column[];
  selectedTask: SelectedTaskInfo;
  isChangeColumnNameModalOpen: boolean;
  processingColumnData: {
    name: string;
    id: string;
  } | null;
  isDeleteColumnModalOpen: boolean;
  isDeleteTaskModalOpen: boolean;
  isTaskInfoSideBarOpened: boolean;
  isProjectSettingsOpened: boolean;
  isAddUserToProjectModalOpened: boolean;
  isAddTagToProjectModalOpened: boolean;
  selectedTag: { tag: Tag | null };
  members: User[];
  tags: Tag[];
  info: {
    id: string;
    title: string;
    description: string;
  } | null;
  allProjects: ProjectShortInfo[];
  creatorId: string | null;
  currentPage: number;
  totalPages: number;
};

export type Task = {
  _id: string;
  title: string;
  description: string;
  assignees: User[];
  tags: Tag[];
  order: number;
};

export type Column = {
  _id: string;
  title: string;
  tasks: Task[];
  order: number;
};

export type ProjectFullInfo = {
  _id: string;
  title: string;
  description: string;
  creatorId: string;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  columns: Column[];
  members: User[];
};
