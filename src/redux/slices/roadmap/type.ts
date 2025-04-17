import { User } from '../../../types/shared';

export type RoadmapInfo = { id: string; ownerId: string };

export type Task = {
  _id: string;
  title: string;
  progress: number;
  start: number;
  end: number;
};

export type Row = {
  _id: string;
  title: string;
  tasks: Task[];
};

export type Category = {
  _id: string;
  title: string;
  color: string;
  rows: Row[];
};

export type Quarter = {
  _id: string;
  title: string;
  start: number;
  end: number;
};

export type Milestone = {
  _id: string;
  title: string;
  position: number;
};

export type RoadmapData = {
  _id: string;
  title: string;
  description: string;
  creatorId: string;
  members: User[];
  quarters: Quarter[];
  milestones: Milestone[];
  categories: Category[];
  updatedAt: string | null;
};

export type RoadmapSliceState = {
  data: RoadmapData | null;
  currentCategory: Category | null;
  currentRow: Row | null;
  currentQuarter: Quarter | null;
  currentMilestone: Milestone | null;
  currentTask: Task | null;
  clickPosition: number;
  isDeletingCategoryOpened: boolean;
  isEditingCategoryOpened: boolean;
  isDeletingRowOpened: boolean;
  isDeletingQuarterModalOpened: boolean;
  isEditingMilestoneModalOpened: boolean;
  isDeletingMilestoneModalOpened: boolean;
  isEditingTaskModalOpened: boolean;
  isDeletingTaskModalOpened: boolean;
};
