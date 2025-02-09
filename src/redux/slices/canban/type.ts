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
  editingColumnData: {
    name: string;
    id: string;
  } | null;
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
