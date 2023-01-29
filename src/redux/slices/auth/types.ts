export type ProfileResponse = {
  data: Profile;
  status: number;
  statusText: string;
};

export type Profile = {
  _id: string;
  createdAt: string;
  email: string;
  token: string;
  updatedAt: string;
  username: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface AuthSliceState {
  status: Status;
  profile: Profile | null;
  message?: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  lastname: string;
  firstPass: string;
}
