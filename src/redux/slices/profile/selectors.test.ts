import {
  MOCK_OBJECT_ONE,
  MOCK_OBJECT_THREE,
  MOCK_OBJECT_TWO,
} from '../../../mocs/state';
import { Status } from '../../../types/shared';

import {
  selectProfileStatus,
  selectUserProfile,
  selectProfileMessage,
  selectStats,
} from './selectors';

describe('Testing profile slice selectors', () => {
  it('selectProfileStatus must work correctly', () => {
    expect(selectProfileStatus(MOCK_OBJECT_ONE)).toBe(Status.LOADING);
    expect(selectProfileStatus(MOCK_OBJECT_TWO)).toBe(Status.SUCCESS);
    expect(selectProfileStatus(MOCK_OBJECT_THREE)).toBe(Status.ERROR);
  });

  it('SelectUserProfile must work correctly', () => {
    const recievedFirstState = selectUserProfile(MOCK_OBJECT_ONE);
    const recievedSecondState = selectUserProfile(MOCK_OBJECT_TWO);
    const recievedThirdState = selectUserProfile(MOCK_OBJECT_THREE);

    expect(recievedFirstState).toBe(null);
    expect(recievedSecondState).toEqual({
      _id: '6460e2e3832ea98269aa3777',
      username: 'dench',
      email: 'dench@gmail.com',
      createdAt: '2023',
      updatedAt: '2024',
      avatar: {
        public_id: 'id',
        url: 'link',
      },
    });
    expect(recievedThirdState).toBe(null);
  });

  it('selectProfileMessage must work correctly', () => {
    expect(selectProfileMessage(MOCK_OBJECT_ONE)).toBe('');
    expect(selectProfileMessage(MOCK_OBJECT_TWO)).toBe('');
    expect(selectProfileMessage(MOCK_OBJECT_THREE)).toBe('Error');
  });

  it('selectStats must work correctly', () => {
    const result1 = selectStats(MOCK_OBJECT_ONE);
    const result2 = selectStats(MOCK_OBJECT_TWO);
    const result3 = selectStats(MOCK_OBJECT_THREE);

    expect(result1).toEqual([]);
    expect(result2).toEqual([
      { counter: 6, date: '16' },
      { counter: 4, date: '2' },
      { counter: 8, date: '100' },
    ]);
    expect(result3).toEqual([]);
  });
});
