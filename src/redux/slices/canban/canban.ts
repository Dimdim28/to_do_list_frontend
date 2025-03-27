import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Status, User } from '../../../types/shared';

import {
  createCanBanBoard,
  fetchAllCanBanBoards,
  fetchCanBanBoardById,
} from './thunk';
import { CanBanSliceState, CanBanState, SelectedTaskInfo, Tag } from './type';

const initialColumnsState: CanBanState = {
  columns: [],
  members: [],
  selectedTask: { task: null },
  isChangeColumnNameModalOpen: false,
  isDeleteColumnModalOpen: false,
  processingColumnData: null,
  isTaskInfoSideBarOpened: false,
  isProjectSettingsOpened: false,
  isAddUserToProjectModalOpened: false,
  isAddTagToProjectModalOpened: false,
  selectedTag: { tag: null },
  info: null,
  tags: [],
  allProjects: [],
  creatorId: null,
};

const initialState: CanBanSliceState = {
  data: initialColumnsState,
  status: Status.SUCCESS,
};

const canBanSlice = createSlice({
  name: 'canban',
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

    setIsAddTagToProjectModalOpened: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      if (!state.data) return;
      state.data.isAddTagToProjectModalOpened = action.payload;
    },

    setProjectInfo: (
      state,
      action: PayloadAction<{
        title: string;
        description: string;
        id: string;
      } | null>,
    ) => {
      if (!state.data) return;

      state.data.info = action.payload;
    },

    addUserToProject: (state, action: PayloadAction<User>) => {
      if (!state.data) return;

      state.data.members = [...state.data.members, action.payload];
    },

    updateUsersInProject: (state, action: PayloadAction<User[]>) => {
      if (!state.data) return;

      state.data.members = action.payload;
    },

    addTagToList: (state, action: PayloadAction<Tag>) => {
      if (!state.data) return;

      state.data.tags = [...state.data.tags, action.payload];
    },

    updateTagInList: (state, action: PayloadAction<Tag>) => {
      if (!state.data) return;

      if (action.payload) {
        state.data.tags = state.data.tags.filter((tag) =>
          tag.id === action.payload.id
            ? {
                id: tag.id,
                text: action.payload.text,
                color: action.payload.color,
              }
            : tag,
        );
      }
    },

    updateTags: (state, action: PayloadAction<Tag[]>) => {
      if (!state.data) return;
      state.data.tags = action.payload;
    },

    setSelectedTag: (state, action: PayloadAction<Tag | null>) => {
      if (!state.data) return;
      state.data.selectedTag = { tag: action.payload };
    },
    deleteUserFromColumns: (state, action: PayloadAction<string>) => {
      if (!state.data) return;
      state.data.columns = state.data.columns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) => ({
          ...task,
          assignedTo: task.assignedTo.filter(
            (user) => user._id !== action.payload,
          ),
        })),
      }));
    },

    deleteTagFromColumns: (state, action: PayloadAction<string>) => {
      if (!state.data) return;
      state.data.columns = state.data.columns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) => ({
          ...task,
          tags: task.tags.filter((tag) => tag.id !== action.payload),
        })),
      }));
    },

    editTagInColumns: (state, action: PayloadAction<Tag>) => {
      if (!state.data) return;

      state.data.columns = state.data.columns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) => ({
          ...task,
          tags: task.tags.map((tag) =>
            tag.id === action.payload.id ? action.payload : tag,
          ),
        })),
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCanBanBoards.pending, (state) => {
      state.status = Status.LOADING;
      state.message = '';
    });
    builder.addCase(fetchAllCanBanBoards.fulfilled, (state, action) => {
      state.data.allProjects = action.payload;
      state.message = '';
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchAllCanBanBoards.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });
    builder.addCase(createCanBanBoard.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(createCanBanBoard.fulfilled, (state, action) => {
      if (!state.data) return;
      state.data.allProjects.push(action.payload);
      state.status = Status.SUCCESS;
    });
    builder.addCase(createCanBanBoard.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });
    builder.addCase(fetchCanBanBoardById.pending, (state) => {
      state.status = Status.LOADING;
      state.message = '';
    });
    builder.addCase(fetchCanBanBoardById.fulfilled, (state, action) => {
      if (!state.data) return;

      const project = action.payload;

      state.data.columns = project.columns;
      state.data.members = project.memberIds.map((id) => ({
        _id: id,
        name: '',
        email: '',
        username: '',
        avatar: '',
      }));
      state.data.tags = project.tags;
      state.data.creatorId = project.creatorId;
      state.data.info = {
        id: project._id,
        title: project.title,
        description: project.description,
      };
      state.status = Status.SUCCESS;
      state.message = '';
    });
    builder.addCase(fetchCanBanBoardById.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });
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
  setIsAddTagToProjectModalOpened,
  addTagToList,
  updateTagInList,
  updateTags,
  updateUsersInProject,
  setSelectedTag,
  deleteUserFromColumns,
  deleteTagFromColumns,
  editTagInColumns,
} = canBanSlice.actions;
