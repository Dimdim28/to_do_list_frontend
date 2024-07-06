import { MOCK_OBJECT_ONE } from '../../../mocs/state';
import { Language, Status, Theme } from '../../../types/shared';
import { authReducer } from './auth';
import { fetchAuthMe, fetchUserData, registerUser } from './thunk';

describe('Testing auth slice extra reducers', () => {
  describe('fetchAuthMe extra reducers:', () => {
    it('should return updated profile when fetchAuthMe fulfilled', () => {
      const PROFILE_META = {
        _id: '161616',
        createdAt: '2016',
        email: 'wwwthebest@gmail.com',
        token: 'qwerty',
        updatedAt: '2023',
        username: 'testmegatest',
      };

      const action = {
        type: fetchAuthMe.fulfilled.type,
        payload: PROFILE_META,
      };
      const result = authReducer(MOCK_OBJECT_ONE.auth, action);
      expect(result).toEqual({
        message: '',
        profile: PROFILE_META,
        status: 'success',
        theme: Theme.DARK,
        lang: Language.EN,
      });
    });

    it('should return null profile when fetchAuthMe is loading', () => {
      const action = {
        type: fetchAuthMe.pending.type,
      };
      const result = authReducer(MOCK_OBJECT_ONE.auth, action);
      expect(result).toEqual({
        message: '',
        profile: null,
        status: Status.LOADING,
        theme: Theme.DARK,
        lang: Language.EN,
      });
    });

    it('should return null profile when fetchAuthMe rejected', () => {
      const action = {
        type: fetchAuthMe.rejected.type,
        payload: 'Error fetchAuthMe',
      };
      const result = authReducer(MOCK_OBJECT_ONE.auth, action);
      expect(result).toEqual({
        message: 'Error fetchAuthMe',
        profile: null,
        status: Status.ERROR,
        theme: Theme.DARK,
        lang: Language.EN,
      });
    });
  });
  describe('fetchUserData extra reducers:', () => {
    it('should return updated profile when fetchUserData fulfilled', () => {
      const USER_DATA = {
        _id: '1111',
        createdAt: '2023',
        email: 'lalala@gmail.com',
        token: 'theBestToken',
        updatedAt: '2024',
        username: 'Dimdim28',
      };

      const action = {
        type: fetchUserData.fulfilled.type,
        payload: USER_DATA,
      };
      const result = authReducer(MOCK_OBJECT_ONE.auth, action);
      expect(result).toEqual({
        message: '',
        profile: USER_DATA,
        status: 'success',
        theme: Theme.DARK,
        lang: Language.EN,
      });
    });

    it('should return null profile when fetchUserData is loading', () => {
      const action = {
        type: fetchUserData.pending.type,
      };
      const result = authReducer(MOCK_OBJECT_ONE.auth, action);
      expect(result).toEqual({
        message: '',
        profile: null,
        status: Status.LOADING,
        theme: Theme.DARK,
        lang: Language.EN,
      });
    });

    it('should return null profile when fetchUserData rejected', () => {
      const action = {
        type: fetchUserData.rejected.type,
        payload: 'Error fetchUserData',
      };
      const result = authReducer(MOCK_OBJECT_ONE.auth, action);
      expect(result).toEqual({
        message: 'Error fetchUserData',
        profile: null,
        status: Status.ERROR,
        theme: Theme.DARK,
        lang: Language.EN,
      });
    });
  });
  describe('registerUser extra reducers:', () => {
    it('should return updated profile when registerUser fulfilled', () => {
      const USER_DATA = {
        _id: '12345',
        createdAt: '1999',
        email: 'valera@gmail.com',
        token: 'token1234',
        updatedAt: '2007',
        username: 'povajas',
      };

      const action = {
        type: registerUser.fulfilled.type,
        payload: USER_DATA,
      };
      const result = authReducer(MOCK_OBJECT_ONE.auth, action);
      expect(result).toEqual({
        message: '',
        profile: USER_DATA,
        status: Status.SUCCESS,
        theme: Theme.DARK,
        lang: Language.EN,
      });
    });

    it('should return null profile when registerUser is loading', () => {
      const action = {
        type: registerUser.pending.type,
      };
      const result = authReducer(MOCK_OBJECT_ONE.auth, action);
      expect(result).toEqual({
        message: '',
        profile: null,
        status: Status.LOADING,
        theme: Theme.DARK,
        lang: Language.EN,
      });
    });

    it('should return null profile when registerUser rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        payload: 'Error registerUser',
      };
      const result = authReducer(MOCK_OBJECT_ONE.auth, action);
      expect(result).toEqual({
        message: 'Error registerUser',
        profile: null,
        status: Status.ERROR,
        theme: Theme.DARK,
        lang: Language.EN,
      });
    });
  });
});
