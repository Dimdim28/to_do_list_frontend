import { User } from '../shared';
import { Category } from './Category';

export type SharedTask = {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  categories: Category[];
  links: string[];
  creator: User;
  deadline: string | null;
  dateOfCompletion: string | null;
  type: 'subtask';
};
