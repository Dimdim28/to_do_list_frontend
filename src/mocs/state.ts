import { RootState } from '../redux/store';
import { Language, Status, Theme } from '../types/shared';

export const MOCK_OBJECT_ONE: RootState = {
  auth: {
    status: Status.SUCCESS,
    profile: {
      _id: '123456',
      createdAt: '2007 year',
      updatedAt: '2008 year',
      email: 'test@gmail.com',
      token: '01032004hahathisismytoken',
      username: 'DimonTheBest',
      avatar: 'link',
      avatarEffect: { _id: '1', animated: '', preview: '', title: '' },
      profileEffect: { _id: '1', preview: '', title: '', sides: '' },
    },
    theme: Theme.DARK,
    lang: Language.EN,
    message: '',
  },
  home: {
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
      totalPages: 5,
      currentPage: 4,
      status: Status.SUCCESS,
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
      message: '',
    },
  },
  profile: {
    stats: [],
    data: null,
    status: Status.LOADING,
    message: '',
  },
  canban: {
    data: null,
    status: Status.LOADING,
  },
  roadmap: {
    data: null,
    status: Status.LOADING,
    currentCategory: null,
    isDeletingCategoryOpened: false,
    isEditingCategoryOpened: false,
    currentRow: null,
    isDeletingRowOpened: false,
  },
};

export const MOCK_OBJECT_TWO: RootState = {
  auth: {
    status: Status.ERROR,
    profile: null,
    message: 'this is an error',
    theme: Theme.LIGHT,
    lang: Language.UA,
  },
  home: {
    category: {
      categories: [],
      totalPages: 0,
      currentPage: 1,
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
  },
  profile: {
    stats: [
      { counter: 6, date: '16' },
      { counter: 4, date: '2' },
      { counter: 8, date: '100' },
    ],
    data: {
      _id: '6460e2e3832ea98269aa3777',
      token: '01032004hahathisismytoken',
      username: 'dench',
      email: 'dench@gmail.com',
      createdAt: '2023',
      updatedAt: '2024',
      avatar: 'link',
      avatarEffect: { _id: '1', animated: '', preview: '', title: '' },
      profileEffect: { _id: '1', preview: '', title: '', sides: '' },
    },
    status: Status.SUCCESS,
    message: '',
  },
  canban: {
    data: null,
    status: Status.LOADING,
  },
  roadmap: {
    data: null,
    status: Status.LOADING,
    currentCategory: null,
    isDeletingCategoryOpened: false,
    isEditingCategoryOpened: false,
    currentRow: null,
    isDeletingRowOpened: false,
  },
};

export const MOCK_OBJECT_THREE: RootState = {
  auth: {
    status: Status.LOADING,
    profile: null,
    theme: Theme.DARK,
    lang: Language.EN,
  },
  home: {
    category: {
      categories: [],
      totalPages: 0,
      currentPage: 1,
      status: Status.ERROR,
      message: 'Error',
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
      message: '',
    },
  },
  profile: {
    stats: [],
    data: null,
    status: Status.ERROR,
    message: 'Error',
  },
  canban: {
    data: null,
    status: Status.LOADING,
  },
  roadmap: {
    data: null,
    status: Status.LOADING,
    currentCategory: null,
    isDeletingCategoryOpened: false,
    isEditingCategoryOpened: false,
    currentRow: null,
    isDeletingRowOpened: false,
  },
};
