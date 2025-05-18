import { Category } from './Category';
import { SubTask } from './SubTask';

export type Task = {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  categories: Category[];
  links: string[];
  subtasks: SubTask[];
  deadline: string | null;
  dateOfCompletion: string | null;
  type: 'task';
};
