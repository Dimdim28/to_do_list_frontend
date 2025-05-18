import {
  MOCK_OBJECT_ONE,
  MOCK_OBJECT_THREE,
  MOCK_OBJECT_TWO,
} from '../../../mocs/state';
import { Status } from '../../../types/shared';

import {
  addCategoryToList,
  clear,
  clearCategories,
  homeReducer,
  removeCategoryFromList,
  updateCategoryInList,
} from './home';
import { HomeSliceState } from './types';

const initialState: HomeSliceState = {
  category: {
    categories: [
      {
        _id: '646b95736b2cb6353f4fd104',
        title: 'hello',
        color: '#d82222',
      },
      {
        _id: '646bbbaefedb212d312d0447',
        title: 'lalala',
        color: '#16a29f',
      },
    ],
    totalPages: 4,
    currentPage: 4,
    status: Status.SUCCESS,
    message: '',
  },
  task: {
    tasks: [],
    currentPage: 1,
    date: 'all',
    isCompleted: 'false',
    activeCategories: [],
    searchPattern: '',
    status: Status.LOADING,
    totalPages: 0,
  },
};

describe('Testing home slice reducers', () => {
  const clearAction = { type: clear.type };
  const clearCategoriesAction = { type: clearCategories.type };

  describe('clear reducer must works correctly', () => {
    it('All slice must be cleared after this reducer calling if we are at the last page', () => {
      const result = homeReducer(initialState, clearAction);
      const initialСlearlState: HomeSliceState = {
        category: {
          categories: [],
          totalPages: 0,
          currentPage: 1,
          status: Status.LOADING,
        },
        task: {
          tasks: [],
          currentPage: 1,
          date: 'all',
          isCompleted: 'false',
          activeCategories: [],
          searchPattern: '',
          status: Status.LOADING,
          totalPages: 0,
        },
      };

      expect(result).toEqual(initialСlearlState);
    });

    it('All slice must be cleared after this reducer calling if we are not at the last page', () => {
      const firstResult = homeReducer(MOCK_OBJECT_ONE.home, clearAction);
      const secondResult = homeReducer(MOCK_OBJECT_TWO.home, clearAction);
      const thirdResult = homeReducer(MOCK_OBJECT_THREE.home, clearAction);
      const initialСlearlState: HomeSliceState = {
        category: {
          categories: [],
          totalPages: 0,
          currentPage: 1,
          status: Status.LOADING,
        },
        task: {
          tasks: [],
          currentPage: 1,
          date: 'all',
          isCompleted: 'false',
          activeCategories: [],
          searchPattern: '',
          status: Status.LOADING,
          totalPages: 0,
        },
      };

      expect(firstResult).toEqual(initialСlearlState);
      expect(secondResult).toEqual(initialСlearlState);
      expect(thirdResult).toEqual(initialСlearlState);
    });
  });

  describe('clearCategories reducer must work correctly', () => {
    const firstResult = homeReducer(
      MOCK_OBJECT_ONE.home,
      clearCategoriesAction,
    );
    const secondResult = homeReducer(
      MOCK_OBJECT_TWO.home,
      clearCategoriesAction,
    );
    const thirdResult = homeReducer(
      MOCK_OBJECT_THREE.home,
      clearCategoriesAction,
    );

    const fourthResult = homeReducer(initialState, clearCategoriesAction);

    it('categories list must be empty', () => {
      expect(firstResult.category.categories).toEqual([]);
      expect(secondResult.category.categories).toEqual([]);
      expect(thirdResult.category.categories).toEqual([]);
      expect(fourthResult.category.categories).toEqual([]);
    });

    it('totalPages must stay the same', () => {
      expect(firstResult.category.totalPages).toBe(5);
      expect(secondResult.category.totalPages).toBe(0);
      expect(thirdResult.category.totalPages).toBe(0);
      expect(fourthResult.category.totalPages).toBe(4);
    });

    it('currentPage must stay the same', () => {
      expect(firstResult.category.currentPage).toBe(4);
      expect(secondResult.category.currentPage).toBe(1);
      expect(thirdResult.category.currentPage).toBe(1);
      expect(fourthResult.category.currentPage).toBe(4);
    });

    it('status must stay the same', () => {
      expect(firstResult.category.status).toBe(Status.SUCCESS);
      expect(secondResult.category.status).toBe(Status.LOADING);
      expect(thirdResult.category.status).toBe(Status.ERROR);
      expect(fourthResult.category.status).toBe(Status.SUCCESS);
    });

    it('message must stay the same', () => {
      expect(firstResult.category.message).toBe('');
      expect(secondResult.category.message).toBe('');
      expect(thirdResult.category.message).toBe('Error');
      expect(fourthResult.category.message).toBe('');
    });
  });

  describe('updateCategoryInList reducer must works correctly', () => {
    const updateFirstCategory = {
      _id: '646b95736b2cb6353f4fd104',
      title: 'hi',
      color: '#000000',
    };
    const prevSecondCategory = {
      _id: '646bbbaefedb212d312d0447',
      title: 'lalala',
      color: '#16a29f',
    };
    const updateCategoryInListAction = {
      type: updateCategoryInList.type,
      payload: updateFirstCategory,
    };
    const recivedResult = homeReducer(
      MOCK_OBJECT_ONE.home,
      updateCategoryInListAction,
    );

    it('First cartegory must be changed', () => {
      expect(updateFirstCategory).toEqual(recivedResult.category.categories[0]);
    });
    it('Second cartegory do not changed', () => {
      expect(prevSecondCategory).toEqual(recivedResult.category.categories[1]);
    });
  });

  describe('addCategoryToList reducer must works correctly if totalPages = currentPage', () => {
    const newCategory = {
      _id: '646b95736b2cb6353f4fd105',
      title: 'hi!',
      user: '63f6342acc86923016194255',
      color: '#000000',
    };
    const addCategoryToListAction = {
      type: addCategoryToList.type,
      payload: newCategory,
    };

    it('Third cartegory must be added if we are at the last page', () => {
      const recivedResult = homeReducer(initialState, addCategoryToListAction);
      expect(recivedResult.category.totalPages).toBe(4);
      expect(recivedResult.category.currentPage).toBe(4);
      expect(recivedResult.category.categories.length).toBe(3);
      expect(recivedResult.category.categories[2]).toEqual(newCategory);
    });

    it('Third cartegory must not be added if we are not at the last page', () => {
      const recivedResult = homeReducer(
        MOCK_OBJECT_ONE.home,
        addCategoryToListAction,
      );
      expect(recivedResult.category.totalPages).toBe(5);
      expect(recivedResult.category.currentPage).toBe(4);
      expect(recivedResult.category.categories.length).toBe(2);
    });
  });

  describe('removeCategoryFromList reducer must work correctly', () => {
    const firstCategory = {
      _id: '646b95736b2cb6353f4fd104',
      title: 'hello',
      color: '#d82222',
    };

    const addCategoryToListAction = {
      type: removeCategoryFromList.type,
    };

    it('removeCategoryFromList if we are at the last page', () => {
      const recivedResult = homeReducer(initialState, addCategoryToListAction);
      expect(recivedResult.category.totalPages).toBe(3);
      expect(recivedResult.category.currentPage).toBe(3);
      expect(recivedResult.category.categories.length).toBe(1);
      expect(recivedResult.category.categories[0]).toEqual(firstCategory);
    });

    it('removeCategoryFromList if we are not at the last page', () => {
      const recivedResult = homeReducer(
        MOCK_OBJECT_ONE.home,
        addCategoryToListAction,
      );
      expect(recivedResult.category.totalPages).toBe(4);
      expect(recivedResult.category.currentPage).toBe(3);
      expect(recivedResult.category.categories.length).toBe(1);
      expect(recivedResult.category.categories[0]).toEqual(firstCategory);
    });
  });
});
