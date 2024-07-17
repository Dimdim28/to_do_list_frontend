import {
  Date,
  IsCompleted,
} from '../../../pages/Home/FiltersBar/Filters/Filters';
import { Category } from '../../../types/entities/Category';
import { Task } from '../../../types/entities/Task';
import { Status } from '../../../types/shared';

export type CategoriesResponse = {
  data: Categories;
  status: number;
  statusText: string;
};

export type Categories = {
  categories: Category[];
  totalPages: number;
  currentPage: number;
  status: Status;
  message?: string;
};

export type Tasks = {
  tasks: Task[];
  totalPages: number;
  currentPage: number;
  searchPattern: string;
  isCompleted: IsCompleted;
  date: Date;
  activeCategories: Category[];
  status: Status;
  message?: string;
};

export type TasksResponse = {
  data: Tasks;
  status: number;
  statusText: string;
};

export interface HomeSliceState {
  category: Categories;
  task: Tasks;
}

export interface CategoriesParams {
  page?: number;
  limit?: number;
}
