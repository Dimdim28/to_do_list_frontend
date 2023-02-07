import { Status } from "../../../types";

export type Profile = {
  email: string;
  avatarUrl: string;
  username: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type ProfileResponse = {
  data: Profile;
  status: number;
  statusText: string;
};

export interface ProfileSliceState {
  status: Status;
  data: Profile | null;
  message?: string;
}

export interface GetProfileParams {
  id: string;
}
