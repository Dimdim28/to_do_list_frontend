import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Status, User } from '../../../types/shared';

import { CanBanSliceState, CanBanState, SelectedTaskInfo, Tag } from './type';

const initialColumnsState: CanBanState = {
  columns: [
    {
      id: 'column-1',
      title: 'To Do',
      tasks: [
        {
          id: 'task-1',
          title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
          description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis atque
          assumenda ut labore consequatur rem neque molestias accusamus quibusdam!
          Deleniti, excepturi voluptas! Eligendi suscipit consectetur libero
          deserunt debitis vitae illo eos quod dolorem nesciunt. Reprehenderit
          inventore accusamus ducimus facere maiores dolor, laudantium sapiente
          optio quo magnam iure quibusdam officiis. `,
          assignedTo: [
            {
              _id: '65267f5fa923db8ef582f46b',
              username: 'dench1',
              avatar:
                'https://res.cloudinary.com/dmbythxia/image/upload/v1739642767/1739642766454-avatar.png',
              avatarEffect: {
                _id: '67b626a880f532b43c4dfc50',
                preview:
                  'https://res.cloudinary.com/dmbythxia/image/upload/v1739990694/1739990693822-user-avatar-effect.png',
                animated:
                  'https://res.cloudinary.com/dmbythxia/image/upload/v1739990695/1739990695246-user-avatar-effect.png',
                title: '1212',
              },
            },
          ],
          tags: [],
        },
        {
          id: 'task-2',
          title: 'Task 2',
          description: 'Task 2',
          assignedTo: [],
          tags: [
            {
              id: '5',
              text: 'ui',
              color: '#fff700',
            },
          ],
        },
      ],
    },
    {
      id: 'column-2',
      title: 'In Progress',
      tasks: [
        {
          id: 'task-3',
          title: 'Task 3',
          description: 'Task 3',
          assignedTo: [
            {
              _id: '65267f5fa923db8ef582f46b',
              username: 'dench1',
              avatar:
                'https://res.cloudinary.com/dmbythxia/image/upload/v1739642767/1739642766454-avatar.png',
              avatarEffect: {
                _id: '67b626a880f532b43c4dfc50',
                preview:
                  'https://res.cloudinary.com/dmbythxia/image/upload/v1739990694/1739990693822-user-avatar-effect.png',
                animated:
                  'https://res.cloudinary.com/dmbythxia/image/upload/v1739990695/1739990695246-user-avatar-effect.png',
                title: '1212',
              },
            },
          ],
          tags: [
            {
              id: '3',
              text: 'docs',
              color: '#13318b',
            },
          ],
        },
        {
          id: 'task-5',
          title: 'Task 5',
          description: 'Task 5',
          assignedTo: [
            {
              _id: '6526f0c30683003f3a049272',
              username: 'Dimdim28',
              avatar:
                'https://res.cloudinary.com/dmbythxia/image/upload/v1739107529/1739107526478-avatar.png',
              avatarEffect: {
                _id: '67b6311a7cb726da1a20a524',
                preview:
                  'https://res.cloudinary.com/dmbythxia/image/upload/v1739993368/1739993368180-user-avatar-effect.png',
                animated:
                  'https://res.cloudinary.com/dmbythxia/image/upload/v1739993369/1739993369474-user-avatar-effect.png',
                title: '34435',
              },
            },
            {
              _id: '65267f5fa923db8ef582f46b',
              username: 'dench1',
              avatar:
                'https://res.cloudinary.com/dmbythxia/image/upload/v1739642767/1739642766454-avatar.png',
              avatarEffect: {
                _id: '67b626a880f532b43c4dfc50',
                preview:
                  'https://res.cloudinary.com/dmbythxia/image/upload/v1739990694/1739990693822-user-avatar-effect.png',
                animated:
                  'https://res.cloudinary.com/dmbythxia/image/upload/v1739990695/1739990695246-user-avatar-effect.png',
                title: '1212',
              },
            },
          ],
          tags: [
            {
              id: '2',
              text: 'feature',
              color: '#00ff4c',
            },
          ],
        },
      ],
    },
    {
      id: 'column-3',
      title: 'Done',
      tasks: [
        {
          id: 'task-4',
          title: 'Task 4',
          description: 'Task 4',
          assignedTo: [
            {
              _id: '6526f0c30683003f3a049272',
              username: 'Dimdim28',
              avatar:
                'https://res.cloudinary.com/dmbythxia/image/upload/v1739107529/1739107526478-avatar.png',
              avatarEffect: {
                _id: '67b6311a7cb726da1a20a524',
                preview:
                  'https://res.cloudinary.com/dmbythxia/image/upload/v1739993368/1739993368180-user-avatar-effect.png',
                animated:
                  'https://res.cloudinary.com/dmbythxia/image/upload/v1739993369/1739993369474-user-avatar-effect.png',
                title: '34435',
              },
            },
          ],
          tags: [
            {
              id: '4',
              text: 'refactor',
              color: '#c01180',
            },
          ],
        },
        {
          id: 'task-6',
          title: 'Task 6',
          description: 'Task 6',
          assignedTo: [
            {
              _id: '6526f0c30683003f3a049272',
              username: 'Dimdim28',
              avatar:
                'https://res.cloudinary.com/dmbythxia/image/upload/v1739107529/1739107526478-avatar.png',
              avatarEffect: {
                _id: '67b6311a7cb726da1a20a524',
                preview:
                  'https://res.cloudinary.com/dmbythxia/image/upload/v1739993368/1739993368180-user-avatar-effect.png',
                animated:
                  'https://res.cloudinary.com/dmbythxia/image/upload/v1739993369/1739993369474-user-avatar-effect.png',
                title: '34435',
              },
            },
          ],
          tags: [
            {
              id: '1',
              text: 'bug',
              color: '#e33131',
            },
          ],
        },
      ],
    },
  ],
  members: [],
  selectedTask: { task: null },
  isChangeColumnNameModalOpen: false,
  isDeleteColumnModalOpen: false,
  processingColumnData: null,
  isTaskInfoSideBarOpened: false,
  isProjectSettingsOpened: false,
  isAddUserToProjectModalOpened: false,
  info: {
    id: 'fsdsf323324324dsfd',
    title: 'deck one',
    description: 'the best canban',
  },
  tags: [
    {
      id: '1',
      text: 'bug',
      color: '#e33131',
    },
    {
      id: '2',
      text: 'feature',
      color: '#00ff4c',
    },
    {
      id: '3',
      text: 'docs',
      color: '#13318b',
    },
    {
      id: '4',
      text: 'refactor',
      color: '#c01180',
    },
    {
      id: '5',
      text: 'ui',
      color: '#fff700',
    },
  ],
};

const initialState: CanBanSliceState = {
  data: initialColumnsState,
  status: Status.LOADING,
};

const canBanSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        columnId: string;
        title: string;
        description: string;
        assigners: User[];
        tags: Tag[];
      }>,
    ) => {
      if (!state.data) return;

      const column = state.data.columns.find(
        (col) => col.id === action.payload.columnId,
      );
      if (column) {
        column.tasks.push({
          id: `task-${Date.now()}`,
          title: action.payload.title,
          description: action.payload.description,
          assignedTo: action.payload.assigners,
          tags: action.payload.tags,
        });
      }
    },

    editTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        title: string;
        description: string;
        assigners: User[];
        tags: Tag[];
      }>,
    ) => {
      if (!state.data) return;

      for (const column of state.data.columns) {
        const task = column.tasks.find((t) => t.id === action.payload.taskId);
        if (task) {
          task.title = action.payload.title;
          task.description = action.payload.description;
          task.assignedTo = action.payload.assigners;
          task.tags = action.payload.tags;
        }
      }
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      if (!state.data) return;

      for (const column of state.data.columns) {
        column.tasks = column.tasks.filter(
          (task) => task.id !== action.payload,
        );
      }
    },

    addColumn: (state, action: PayloadAction<string>) => {
      if (!state.data) return;
      state.data.columns.push({
        id: `column-${Date.now()}`,
        title: action.payload,
        tasks: [],
      });
    },

    editColumn: (
      state,
      action: PayloadAction<{ columnId: string; title: string }>,
    ) => {
      if (!state.data) return;
      const column = state.data.columns.find(
        (col) => col.id === action.payload.columnId,
      );
      if (column) {
        column.title = action.payload.title;
      }
    },

    setProcessingColumnData: (
      state,
      action: PayloadAction<{ columnId: string; title: string } | null>,
    ) => {
      if (!state.data) return;
      if (action.payload === null) {
        state.data.processingColumnData = null;
      } else {
        const { columnId, title } = action.payload;
        state.data.processingColumnData = { id: columnId, name: title };
      }
    },

    deleteColumn: (state, action: PayloadAction<string>) => {
      if (!state.data) return;
      state.data.columns = state.data.columns.filter(
        (col) => col.id !== action.payload,
      );
    },

    setSelectedTask: (state, action: PayloadAction<SelectedTaskInfo>) => {
      if (!state.data) return;
      state.data.selectedTask = action.payload;
    },

    setChangeColumnNameModalOpen: (state, action: PayloadAction<boolean>) => {
      if (!state.data) return;
      state.data.isChangeColumnNameModalOpen = action.payload;
    },

    setDeleteColumnModalOpen: (state, action: PayloadAction<boolean>) => {
      if (!state.data) return;
      state.data.isDeleteColumnModalOpen = action.payload;
    },

    setEditProjectModalOpened: (state, action: PayloadAction<boolean>) => {
      if (!state.data) return;
      state.data.isProjectSettingsOpened = action.payload;
    },

    moveTask: (
      state,
      action: PayloadAction<{
        sourceIndex: number;
        destinationIndex: number;
        sourceColId: string;
        destColId: string;
      }>,
    ) => {
      if (!state.data) return;
      const { sourceIndex, destinationIndex, sourceColId, destColId } =
        action.payload;
      const sourceColumn = state.data.columns.find(
        (col) => col.id === sourceColId,
      );
      const destinationColumn = state.data.columns.find(
        (col) => col.id === destColId,
      );

      if (!sourceColumn || !destinationColumn) return;

      const [movedTask] = sourceColumn.tasks.splice(sourceIndex, 1);
      destinationColumn.tasks.splice(destinationIndex, 0, movedTask);
    },

    setIsTaskInfoModalOpened: (state, action: PayloadAction<boolean>) => {
      if (!state.data) return;
      state.data.isTaskInfoSideBarOpened = action.payload;
    },

    setIsAddUserToProjectModalOpened: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      if (!state.data) return;
      state.data.isAddUserToProjectModalOpened = action.payload;
    },

    setProjectInfo: (
      state,
      action: PayloadAction<{ title?: string; description?: string }>,
    ) => {
      if (!state.data) return;

      if (action.payload.title) {
        state.data.info.title = action.payload.title;
      }
      if (action.payload.description) {
        state.data.info.description = action.payload.description;
      }
    },

    addUserToProject: (state, action: PayloadAction<User>) => {
      if (!state.data) return;

      state.data.members = [...state.data.members, action.payload];
    },

    removeUserFromProject: (state, action: PayloadAction<string>) => {
      if (!state.data) return;

      state.data.members = state.data.members.filter(
        (user) => user._id !== action.payload,
      );
    },
  },
});

export const canBanReducer = canBanSlice.reducer;
export const {
  addTask,
  editTask,
  deleteTask,
  addColumn,
  editColumn,
  deleteColumn,
  setSelectedTask,
  setChangeColumnNameModalOpen,
  setProcessingColumnData,
  moveTask,
  setDeleteColumnModalOpen,
  setIsTaskInfoModalOpened,
  setEditProjectModalOpened,
  setProjectInfo,
  setIsAddUserToProjectModalOpened,
  addUserToProject,
  removeUserFromProject,
} = canBanSlice.actions;
