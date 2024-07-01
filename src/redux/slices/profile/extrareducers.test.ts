import { MOCK_OBJECT_ONE } from '../../../mocs/state';
import { Status } from '../../../types';
import { profileReducer } from './profile';
import {
  fetchUserProfile,
  changeAvatar,
  deleteAccount,
  changePass,
  changeName,
  getStats,
} from './thunk';

describe('Testing profile slice extra reducers', () => {
  describe('fetchUserProfile extra reducers:', () => {
    it('should return updated profile when fetchUserProfile fulfilled', () => {
      const PROFILE_META = {
        _id: '431ggd91gdb9',
        createdAt: '2020',
        email: 'bigpisos669@gmail.com',
        token: 'yes',
        updatedAt: '2023',
        username: 'kill',
      };

      const action = {
        type: fetchUserProfile.fulfilled.type,
        payload: PROFILE_META,
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        message: '',
        data: PROFILE_META,
        status: Status.LOADING,
        stats: [],
      });
    });

    it('should return null profile when fetchUserProfile is loading', () => {
      const action = {
        type: fetchUserProfile.pending.type,
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        message: '',
        data: null,
        status: Status.LOADING,
        stats: [],
      });
    });

    it('should return null profile when fetchUserProfile rejected', () => {
      const action = {
        type: fetchUserProfile.rejected.type,
        payload: 'Error fetchUserProfile',
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        message: 'Error fetchUserProfile',
        data: null,
        status: Status.ERROR,
        stats: [],
      });
    });
  });

  describe('changeAvatar extra reducers:', () => {
    it('should return profile when changeAvatar fulfilled', () => {
      const avatarUrl = 'string';

      const action = {
        type: changeAvatar.fulfilled.type,
        payload: avatarUrl,
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        data: null,
        message: '',
        status: 'success',
        stats: [],
      });
    });

    it('should return null profile when changeAvatar is loading', () => {
      const action = {
        type: changeAvatar.pending.type,
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        message: '',
        data: null,
        status: Status.LOADING,
        stats: [],
      });
    });

    it('should return null profile when changeAvatar rejected', () => {
      const action = {
        type: changeAvatar.rejected.type,
        payload: 'Error fetchUserData',
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        data: null,
        message: 'Error fetchUserData',
        status: 'error',
        stats: [],
      });
    });
  });

  describe('deleteAccount extra reducers:', () => {
    it('should return null profile when deleteAccount fulfilled', () => {
      const action = {
        type: deleteAccount.fulfilled.type,
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        data: null,
        message: '',
        status: Status.SUCCESS,
        stats: [],
      });
    });

    it('should return null profile when deleteAccount is loading', () => {
      const action = {
        type: deleteAccount.pending.type,
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        data: null,
        message: '',
        status: Status.LOADING,
        stats: [],
      });
    });

    it('should return null profile when deleteAccount is rejected', () => {
      const action = {
        type: deleteAccount.rejected.type,
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        data: null,
        message: 'undefined',
        status: Status.ERROR,
        stats: [],
      });
    });
  });

  describe('changePass extra reducers:', () => {
    it('should return null profile when changePass fulfilled', () => {
      const action = {
        type: changePass.fulfilled.type,
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        data: null,
        message: '',
        status: Status.SUCCESS,
        stats: [],
      });
    });

    it('should return null profile when changePass is loading', () => {
      const action = {
        type: changePass.pending.type,
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        data: null,
        message: '',
        status: Status.LOADING,
        stats: [],
      });
    });

    it('should return null profile when changePass is rejected', () => {
      const action = {
        type: changePass.rejected.type,
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        data: null,
        message: 'undefined',
        status: Status.ERROR,
        stats: [],
      });
    });
  });

  describe('changeName extra reducers:', () => {
    it('should return null profile when changeName fulfilled', () => {
      const action = {
        type: changePass.fulfilled.type,
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        data: null,
        message: '',
        status: Status.SUCCESS,
        stats: [],
      });
    });

    it('should return null profile when changeName is loading', () => {
      const action = {
        type: changeName.pending.type,
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        data: null,
        message: '',
        status: Status.LOADING,
        stats: [],
      });
    });

    it('should return null profile when changeName is rejected', () => {
      const action = {
        type: changeName.rejected.type,
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        data: null,
        message: 'undefined',
        status: Status.ERROR,
        stats: [],
      });
    });
  });

  describe('getStats extra reducers:', () => {
    it('should return null profile when getStats fulfilled', () => {
      const action = {
        type: getStats.fulfilled.type,
        payload: [{ count: 6, date: '666' }],
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        data: null,
        message: '',
        status: Status.SUCCESS,
        stats: [{ count: 6, date: '666' }],
      });
    });

    it('should return null profile when getStats is loading', () => {
      const action = {
        type: getStats.pending.type,
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        data: null,
        message: '',
        status: Status.LOADING,
        stats: [],
      });
    });

    it('should return null profile when getStats is rejected', () => {
      const action = {
        type: getStats.rejected.type,
      };
      const result = profileReducer(MOCK_OBJECT_ONE.profile, action);
      expect(result).toEqual({
        data: null,
        message: 'undefined',
        status: Status.ERROR,
        stats: [],
      });
    });
  });
});
