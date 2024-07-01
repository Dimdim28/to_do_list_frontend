import { Status } from '../../../types';
import { homeReducer } from './home';
import { fetchCategories } from './thunk';

const initialState: any = {
  category: {
    categories: [],
    totalPages: 0,
    currentPage: 0,
    status: Status.LOADING,
    message: '',
  },
  task: {
    tasks: [],
    currentPage: 1,
    searchPattern: '',
    isCompleted: 'false',
    date: 'all',
    activeCategories: [],
    status: Status.LOADING,
    totalPages: 0,
  },
};

describe('fetchCategories extra reducers:', () => {
  it('should update categories and status when fetchCategories is fulfilled', () => {
    const categoriesPayload = {
      categories: ['Category 1', 'Category 2'],
      totalPages: 2,
      currentPage: '1',
    };

    const action = {
      type: fetchCategories.fulfilled.type,
      payload: categoriesPayload,
    };

    const expectedState = {
      category: {
        categories: ['Category 1', 'Category 2'],
        totalPages: 2,
        currentPage: 1,
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

    const result = homeReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('should update status when fetchCategories is loading', () => {
    const action = {
      type: fetchCategories.pending.type,
    };

    const expectedState = {
      category: {
        categories: [],
        totalPages: 0,
        currentPage: 0,
        status: Status.LOADING,
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

    const result = homeReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('should update status and message when fetchCategories is rejected', () => {
    const action = {
      type: fetchCategories.rejected.type,
      payload: 'Error fetching categories',
    };

    const expectedState = {
      category: {
        categories: [],
        totalPages: 0,
        currentPage: 0,
        status: Status.ERROR,
        message: 'Error fetching categories',
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

    const result = homeReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
});
