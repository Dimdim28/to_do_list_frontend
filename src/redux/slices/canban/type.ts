import { Status } from '../../../types/shared';

export type CanBanSliceState = {
  data: CanBanState | null;
  status: Status;
  message?: string;
};

export type CanBanState = {
  columns: Column[];
  selectedTask: Task | null;
  isChangeColumnNameModalOpen: boolean;
  processingColumnData: {
    name: string;
    id: string;
  } | null;
  isDeleteColumnModalOpen: boolean;
  isTaskInfoSideBarOpened: boolean;
};

export type Task = {
  id: string;
  content: string;
  assignedTo: string[];
};

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
};
