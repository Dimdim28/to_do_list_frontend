import {
  MOCK_OBJECT_ONE,
  MOCK_OBJECT_THREE,
  MOCK_OBJECT_TWO,
} from '../../../mocs/state';
import { Status } from '../../../types/shared';

import {
  selectCategoryCurrentPage,
  selectCategoryTotalPages,
  selectCategories,
  selectCategoriesStatus,
  selectCategoriesError,
} from './selectors';

describe('Testing home slice selectors', () => {
  it('selectCategoryCurrentPage must work correctly', () => {
    expect(selectCategoryCurrentPage(MOCK_OBJECT_ONE)).toBe(4);
    expect(selectCategoryCurrentPage(MOCK_OBJECT_TWO)).toBe(1);
    expect(selectCategoryCurrentPage(MOCK_OBJECT_THREE)).toBe(1);
  });

  it('selectCategoryTotalPages must work correctly', () => {
    expect(selectCategoryTotalPages(MOCK_OBJECT_ONE)).toBe(5);
    expect(selectCategoryTotalPages(MOCK_OBJECT_TWO)).toBe(0);
    expect(selectCategoryTotalPages(MOCK_OBJECT_THREE)).toBe(0);
  });

  it('selectCategories must work correctly', () => {
    const recievedFirstState = selectCategories(MOCK_OBJECT_ONE);
    const recievedSecondState = selectCategories(MOCK_OBJECT_TWO);
    const recievedThirdState = selectCategories(MOCK_OBJECT_THREE);

    expect(recievedFirstState).toEqual([
      {
        _id: '646b95736b2cb6353f4fd104',
        title: 'hello',
        user: '63f6342acc86923016194255',
        color: '#d82222',
      },
      {
        _id: '646bbbaefedb212d312d0447',
        title: 'lalala',
        user: '63f6342acc86923016194255',
        color: '#16a29f',
      },
    ]);

    expect(recievedSecondState).toEqual([]);
    expect(recievedThirdState).toEqual([]);
  });

  it('selectCategoriesStatus must work correctly', () => {
    expect(selectCategoriesStatus(MOCK_OBJECT_ONE)).toBe(Status.SUCCESS);
    expect(selectCategoriesStatus(MOCK_OBJECT_TWO)).toBe(Status.LOADING);
    expect(selectCategoriesStatus(MOCK_OBJECT_THREE)).toBe(Status.ERROR);
  });

  it('selectCategoriesrError must work correctly', () => {
    expect(selectCategoriesError(MOCK_OBJECT_ONE)).toBe('');
    expect(selectCategoriesError(MOCK_OBJECT_TWO)).toBe('');
    expect(selectCategoriesError(MOCK_OBJECT_THREE)).toBe('Error');
  });
});
