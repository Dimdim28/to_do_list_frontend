import { Status } from '../../../types';

export type Profile = {
  email: string;
  avatar: Avatar;
  username: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type Avatar = { url: string; public_id: string };
export type Message = { status: number };

export type ProfileResponse = {
  data: Profile;
  status: number;
  statusText: string;
};

export interface ProfileSliceState {
  status: Status;
  data: Profile | null;
  message?: string;
  stats: DailyStats[];
}

export interface GetProfileParams {
  id: string;
}

export interface ChangeAvatarParams {
  image: FormData;
}

export type AvatarResponse = {
  data: Avatar;
  status: number;
  statusText: string;
};

export type DeleteAccountResponse = {
  data: Message;
  status: number;
  statusText: string;
};

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export type UpdateProfileResponse = {
  data: Message;
  status: number;
  statusText: string;
};

export interface ChangeName {
  username: string;
  userId: string;
}

export type DailyStats = {
  date: string;
  counter: number;
};

export type StatsResponse = {
  data: DailyStats[];
  status: number;
  statusText: string;
};
