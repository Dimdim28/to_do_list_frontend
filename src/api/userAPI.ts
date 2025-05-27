import instanse from '../axios';
import { AvatarEffect, ProfileEffect, Status, User } from '../types/shared';

export type FetchUsersResponse = {
  results: User[];
  page: number;
  totalPages: number;
};

export type FetchProfileEffectsResponse = {
  status: number;
  statusText: string;
  data: ProfileEffect[];
};

export type UpdateUserProfileEffectResponse = {
  status: number;
  statusText: string;
  data: {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    profileEffect: ProfileEffect;
  };
};

export type FetchAvatarEffectsResponse = {
  status: number;
  statusText: string;
  data: AvatarEffect[];
};

export type UpdateUserAvatarEffectResponse = {
  status: number;
  statusText: string;
  data: {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    avatarEffect: AvatarEffect;
  };
};

class userAPIClass {
  public async getUsers(username: string, page?: number, limit?: number) {
    try {
      const response = await instanse.get<FetchUsersResponse>(`/user`, {
        params: {
          username,
          page,
          limit,
        },
      });

      return {
        users: response.data.results,
        page: response.data.page || 1,
        totalPages: response.data.totalPages || 1,
        status: Status.SUCCESS,
      };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
        users: [],
        page: 1,
        totalPages: 1,
      };
    }
  }

  public async getAllProfileEffects() {
    try {
      const response: FetchProfileEffectsResponse = await instanse.get(
        `/image/profile-effect`,
        {},
      );
      return {
        effects: response.data,
        status: Status.SUCCESS,
      };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
      };
    }
  }

  public async updateUserProfileEffect(id: string) {
    try {
      const response: UpdateUserProfileEffectResponse = await instanse.patch(
        `/user`,
        {
          profileEffectId: id,
        },
      );
      return {
        newEffect: response.data,
        status: Status.SUCCESS,
      };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
      };
    }
  }

  public async getAllUserAvatarEffects() {
    try {
      const response: FetchAvatarEffectsResponse = await instanse.get(
        `/image/user-avatar-effect`,
      );
      return {
        effects: response.data,
        status: Status.SUCCESS,
      };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
      };
    }
  }

  public async updateUserAvatarEffect(id: string) {
    try {
      const response: UpdateUserAvatarEffectResponse = await instanse.patch(
        `/user`,
        {
          avatarEffectId: id,
        },
      );
      return {
        newEffect: response.data,
        status: Status.SUCCESS,
      };
    } catch (err: any) {
      return {
        message: err?.response?.data?.message || 'Error',
        status: Status.ERROR,
      };
    }
  }
}

const userAPI = new userAPIClass();
export default userAPI;
