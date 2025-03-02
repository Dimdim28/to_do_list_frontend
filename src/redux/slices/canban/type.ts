import { Status, User } from '../../../types/shared';

export type CanBanSliceState = {
  data: CanBanState | null;
  status: Status;
  message?: string;
};

export type SelectedTaskInfo = {
  task: Task | null;
  columnId?: string;
  indexInColumn?: number;
};

export type Tag = {
  id: string;
  text: string;
  color: string;
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
  allProjects: {
    id: string;
    title: string;
    description: string;
    membersCount: number;
  }[];
};

export type Task = {
  id: string;
  title: string;
  description: string;
  assignedTo: User[];
  tags: Tag[];
};

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
};
