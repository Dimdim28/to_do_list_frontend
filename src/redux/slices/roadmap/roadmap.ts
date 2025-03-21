import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Status } from '../../../types/shared';

import { Category, RoadmapData, RoadmapSliceState } from './type';

export const initialData: RoadmapData = {
  id: 'roadmap-1',
  title: 'life',
  ownerId: 'owner-123',
  quarters: [
    { id: 'q1', title: 'Q1', start: 0, end: 100 },
    { id: 'q2', title: 'Q2', start: 100, end: 200 },
    { id: 'q3', title: 'Q3', start: 200, end: 300 },
    { id: 'q4', title: 'Q4', start: 300, end: 400 },
  ],
  milestones: [
    { id: 'm1', title: 'Community Site Beta', position: 30 },
    { id: 'm2', title: 'Android Mobile App Launch', position: 120 },
    { id: 'm3', title: 'iOS Mobile App Launch', position: 220 },
    { id: 'm4', title: 'US Web Store Launch', position: 290 },
    { id: 'm5', title: 'Holiday Blackout', position: 350 },
  ],
  categories: [
    {
      id: 'cat-1',
      title: 'SELF SERVE',
      color: '#f4b400',
      rows: [
        {
          id: 'row-1-1',
          title: '',
          tasks: [
            {
              id: 'task-1',
              title: 'Two-Factor Authen...',
              progress: 100,
              start: 10,
              end: 50,
              status: 'done',
            },

            {
              id: 'task-5',
              title: 'Single-Sign On',
              progress: 100,
              start: 110,
              end: 180,
              status: 'done',
            },
            {
              id: 'task-6',
              title: 'User Avatar',
              progress: 20,
              start: 220,
              end: 300,
              status: 'pending',
            },
          ],
        },
        {
          id: 'row-1-2',
          title: '',
          tasks: [
            {
              id: 'task-2',
              title: 'Forgot Password Improvement',
              progress: 50,
              start: 60,
              end: 130,
              status: 'in_progress',
            },
            {
              id: 'task-7',
              title: 'Multi-Account Mana...',
              progress: 10,
              start: 270,
              end: 350,
              status: 'pending',
            },
          ],
        },
        {
          id: 'row-1-3',
          title: '',
          tasks: [
            {
              id: 'task-3',
              title: 'Language Localization',
              progress: 80,
              start: 40,
              end: 150,
              status: 'in_progress',
            },
            {
              id: 'task-4',
              title: 'Reward (Progress Bar)',
              progress: 30,
              start: 160,
              end: 240,
              status: 'pending',
            },
          ],
        },
      ],
    },
    {
      id: 'cat-2',
      title: 'MOBILE',
      color: '#db4437',
      rows: [
        {
          id: 'row-2-1',
          title: '',
          tasks: [
            {
              id: 'task-8',
              title: 'iOS App',
              progress: 100,
              start: 10,
              end: 70,
              status: 'done',
            },
          ],
        },

        {
          id: 'row-2-2',
          title: '',
          tasks: [
            {
              id: 'task-9',
              title: 'Android App',
              progress: 90,
              start: 20,
              end: 120,
              status: 'in_progress',
            },
            {
              id: 'task-11',
              title: 'Facebook Integration',
              progress: 20,
              start: 200,
              end: 250,
              status: 'pending',
            },
          ],
        },
        {
          id: 'row-2-3',
          title: '',
          tasks: [
            {
              id: 'task-10',
              title: 'Apple Pay',
              progress: 60,
              start: 120,
              end: 180,
              status: 'in_progress',
            },
            {
              id: 'task-12',
              title: 'Push Notifications',
              progress: 10,
              start: 300,
              end: 370,
              status: 'pending',
            },
          ],
        },
      ],
    },
    {
      id: 'cat-3',
      title: 'WEBSTORE',
      color: '#0f9d58',
      rows: [
        {
          id: 'row-3-1',
          title: '',
          tasks: [
            {
              id: 'task-13',
              title: 'Responsive eCommerce site',
              progress: 100,
              start: 10,
              end: 50,
              status: 'done',
            },

            {
              id: 'task-15',
              title: 'Abandon Cart Widget',
              progress: 80,
              start: 120,
              end: 180,
              status: 'in_progress',
            },
          ],
        },
        {
          id: 'row-3-2',
          title: '',
          tasks: [
            {
              id: 'task-14',
              title: 'PCI Compliance',
              progress: 100,
              start: 50,
              end: 100,
              status: 'done',
            },
            {
              id: 'task-17',
              title: 'Guest Checkout Improvement',
              progress: 30,
              start: 220,
              end: 270,
              status: 'pending',
            },
            {
              id: 'task-19',
              title: 'Holiday Blackout',
              progress: 0,
              start: 350,
              end: 400,
              status: 'pending',
            },
          ],
        },
        {
          id: 'row-3-3',
          title: '',
          tasks: [
            {
              id: 'task-16',
              title: 'Reskin Shopping Cart',
              progress: 50,
              start: 140,
              end: 200,
              status: 'in_progress',
            },
          ],
        },
        {
          id: 'row-3-4',
          title: '',
          tasks: [
            {
              id: 'task-18',
              title: 'Two-Day Shipping',
              progress: 40,
              start: 200,
              end: 300,
              status: 'pending',
            },
          ],
        },
      ],
    },
    {
      id: 'cat-4',
      title: 'HELP DESK',
      color: '#4285f4',
      rows: [
        {
          id: 'row-4-1',
          title: '',
          tasks: [
            {
              id: 'task-20',
              title: 'Help Bot',
              progress: 100,
              start: 10,
              end: 60,
              status: 'done',
            },
            {
              id: 'task-21',
              title: 'Update Navigation',
              progress: 80,
              start: 70,
              end: 150,
              status: 'in_progress',
            },
            {
              id: 'task-22',
              title: 'Search Improvements',
              progress: 50,
              start: 200,
              end: 270,
              status: 'in_progress',
            },
          ],
        },
        {
          id: 'row-4-2',
          title: '',
          tasks: [
            {
              id: 'task-23',
              title: 'Accessibility Improvements',
              progress: 30,
              start: 80,
              end: 350,
              status: 'pending',
            },
          ],
        },
      ],
    },
    {
      id: 'cat-5',
      title: 'INFRASTRUCTURE',
      color: '#b71c1c',
      rows: [
        {
          id: 'row-5-1',
          title: '',
          tasks: [
            {
              id: 'task-24',
              title: 'Database Improvem...',
              progress: 100,
              start: 10,
              end: 50,
              status: 'done',
            },

            {
              id: 'task-26',
              title: 'Library Upgrades',
              progress: 60,
              start: 120,
              end: 200,
              status: 'in_progress',
            },
          ],
        },
        {
          id: 'row-5-2',
          title: '',
          tasks: [
            {
              id: 'task-25',
              title: 'Update API Documentation',
              progress: 80,
              start: 50,
              end: 120,
              status: 'in_progress',
            },
            {
              id: 'task-27',
              title: 'Optimize Server Serialization',
              progress: 40,
              start: 200,
              end: 270,
              status: 'pending',
            },
          ],
        },
        {
          id: 'row-5-3',
          title: '',
          tasks: [
            {
              id: 'task-28',
              title: 'Data Dump',
              progress: 20,
              start: 250,
              end: 300,
              status: 'pending',
            },
          ],
        },
      ],
    },
  ],
};

const initialState: RoadmapSliceState = {
  data: initialData,
  status: Status.SUCCESS,
  currentCategory: null,
  isDeletingCategoryOpened: false,
  isEditingCategoryOpened: false,
};

const canBanSlice = createSlice({
  name: 'roadmap',
  initialState,
  reducers: {
    setRoadmapCurrentCategory: (
      state,
      action: PayloadAction<Category | null>,
    ) => {
      state.currentCategory = action.payload;
    },
    setRoadmapIsDeletingCategoryOpened: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isDeletingCategoryOpened = action.payload;
    },
    setRoadmapIsEditingCategoryOpened: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isEditingCategoryOpened = action.payload;
    },

    editRoadmapCategory: (
      state,
      action: PayloadAction<{ id: string; color: string; title: string }>,
    ) => {
      if (!state.data) return;

      state.data.categories = state.data.categories.map((category) =>
        category.id === action.payload.id
          ? {
              ...category,
              color: action.payload.color,
              title: action.payload.title,
            }
          : category,
      );
    },

    deleteRoadmapCategory: (state, action: PayloadAction<string>) => {
      if (!state.data) return;

      state.data.categories = state.data.categories.filter(
        (category) => category.id !== action.payload,
      );
    },
  },
});

export const roadmapReducer = canBanSlice.reducer;
export const {
  setRoadmapCurrentCategory,
  setRoadmapIsDeletingCategoryOpened,
  setRoadmapIsEditingCategoryOpened,
  editRoadmapCategory,
  deleteRoadmapCategory,
} = canBanSlice.actions;
