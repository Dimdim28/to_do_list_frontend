import { Status } from '../../../types/shared';

export type RoadmapInfo = { id: string; ownerId: string };

export type Task = {
  id: string;
  title: string;
  progress: number; // 0 - 100 (процент выполнения)
  start: number; // Координата начала в единицах шкалы (например, 0 - начало Q1, 100 - конец Q1)
  end: number; // Координата конца (например, 250 - середина Q3)
  status: 'done' | 'in_progress' | 'pending'; // Статус задачи (например, "pending", "in_progress", "done")
};

export type Row = {
  id: string;
  title: string;
  tasks: Task[];
};

export type Category = {
  id: string;
  title: string;
  color: string; // HEX или строка типа "red"
  rows: Row[];
};

export type Quarter = {
  id: string;
  title: string; // "Q1", "Q2", "Q3", "Q4"
  start: number; // Например, 0 (Q1), 100 (Q2), 200 (Q3), 300 (Q4)
  end: number; // Например, 100 (Q1), 200 (Q2), 300 (Q3), 400 (Q4)
};

export type Milestone = {
  id: string;
  title: string;
  position: number; // Например, 150 — середина Q2
  icon?: string; // Иконка для отображения (если нужна)
};

export type RoadmapData = {
  title: string;
  id: string;
  ownerId: string;
  quarters: Quarter[];
  categories: Category[];
  milestones: Milestone[];
};

export type RoadmapSliceState = {
  data: RoadmapData | null;
  status: Status;
  message?: string;
  currentCategory: Category | null;
  isDeletingCategoryOpened: boolean;
  isEditingCategoryOpened: boolean;
};
