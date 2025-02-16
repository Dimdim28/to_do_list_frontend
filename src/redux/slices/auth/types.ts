import { Language, ProfileEffect, Status, Theme } from '../../../types/shared';

export type Roles = 'user' | 'admin';

export type Profile = {
  _id: string;
  createdAt: string;
  email: string;
  token: string;
  updatedAt: string;
  username: string;
  avatar: string;
  roles?: [Roles, Roles];
  isBanned?: boolean;
  profileEffect: ProfileEffect;
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
