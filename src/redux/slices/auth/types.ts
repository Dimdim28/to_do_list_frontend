import { Language, Status, Theme } from '../../../types/shared';

export type Roles = 'user' | 'admin';

export type Profile = {
  _id: string;
  createdAt: string;
  email: string;
  token: string;
  updatedAt: string;
  username: string;
  avatar: {
    url: string;
    public_id: string;
  };
  roles?: [Roles, Roles];
  isBanned?: boolean;
};

export type ProfileResponse = {
  data: Profile;
  status: number;
  statusText: string;
};

export interface AuthSliceState {
  status: Status;
  profile: Profile | null;
  message?: string;
  theme: Theme;
  lang: Language;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  username: string;
  firstPass: string;
  secondPass: string;
}
