import { Status } from '../../../types/shared';

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
};

export type Task = {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
};

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
};
