import {
  MOCK_OBJECT_ONE,
  MOCK_OBJECT_THREE,
  MOCK_OBJECT_TWO,
} from '../../../mocs/state';

import {
  selectIsAuth,
  selectIsChecked,
  selectIsRegistered,
  selectMessage,
  selectProfile,
} from './selectors';

describe('Testing auth slice selectors', () => {
  it('SelectIsAuth must work correctly', () => {
    expect(selectIsAuth(MOCK_OBJECT_ONE)).toBe(true);
    expect(selectIsAuth(MOCK_OBJECT_TWO)).toBe(false);
  });

  it('SelectIsChecked must work correctly', () => {
    expect(selectIsChecked(MOCK_OBJECT_ONE)).toBe(true);
    expect(selectIsChecked(MOCK_OBJECT_TWO)).toBe(true);
    expect(selectIsChecked(MOCK_OBJECT_THREE)).toBe(false);
  });

  it('selectIsRegistered must work correctly', () => {
    expect(selectIsRegistered(MOCK_OBJECT_ONE)).toBe(true);
    expect(selectIsRegistered(MOCK_OBJECT_TWO)).toBe(false);
    expect(selectIsRegistered(MOCK_OBJECT_THREE)).toBe(false);
  });

  it('selectProfile must work correctly', () => {
    const recievedFirstState = selectProfile(MOCK_OBJECT_ONE);
    const recievedSecondState = selectProfile(MOCK_OBJECT_TWO);
    const recievedThirdState = selectProfile(MOCK_OBJECT_THREE);

    expect(recievedFirstState).toEqual({
      _id: '123456',
      createdAt: '2007 year',
      updatedAt: '2008 year',
      email: 'test@gmail.com',
      token: '01032004hahathisismytoken',
      username: 'DimonTheBest',
      avatar: 'link',
      avatarEffect: { _id: '1', animated: '', preview: '', title: '' },
      profileEffect: { _id: '1', preview: '', title: '', sides: '' },
    });

    expect(recievedSecondState).toBe(null);
    expect(recievedThirdState).toBe(null);
  });

  it('selectMessage must work correctly', () => {
    expect(selectMessage(MOCK_OBJECT_ONE)).toBe('');
    expect(selectMessage(MOCK_OBJECT_TWO)).toBe('this is an error');
    expect(selectMessage(MOCK_OBJECT_THREE)).toBe(undefined);
  });
});
