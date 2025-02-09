import { Avatar, Status } from '../../../types/shared';
import { Profile } from '../auth/types';

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
  data: string;
  status: number;
  statusText: string;
};

export type PublicAvatarResponse = {
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
  data: Profile;
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
