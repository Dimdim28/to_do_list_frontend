import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Status, User } from '../../../types/shared';

import {
  createCanBanBoard,
  createCanBanColumn,
  deleteCanBanColumn,
  fetchAllCanBanBoards,
  fetchCanBanBoardById,
  updateCanBanColumn,
} from './thunk';
import { CanBanSliceState, CanBanState, SelectedTaskInfo, Tag } from './type';

const initialColumnsState: CanBanState = {
  columns: [],
  members: [],
  selectedTask: { task: null },
  isChangeColumnNameModalOpen: false,
  isDeleteColumnModalOpen: false,
  isDeleteTaskModalOpen: false,
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
  currentPage: 0,
  totalPages: 0,
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
        taskId: string;
        orderId: number;
      }>,
    ) => {
      if (!state.data) return;

      const column = state.data.columns.find(
        (col) => col._id === action.payload.columnId,
      );
      if (column) {
        column.tasks.push({
          _id: action.payload.taskId,
          title: action.payload.title,
          description: action.payload.description,
          assignees: action.payload.assigners || [],
          tags: action.payload.tags,
          order: action.payload.orderId,
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
        const task = column.tasks.find((t) => t._id === action.payload.taskId);
        if (task) {
          task.title = action.payload.title;
          task.description = action.payload.description;
          task.assignees = action.payload.assigners;
          task.tags = action.payload.tags;
        }
      }
    },

    deleteTask: (
      state,
      action: PayloadAction<{ columnId: string; taskId: string }>,
    ) => {
      if (!state.data) return;

      const { columnId, taskId } = action.payload;

      const column = state.data.columns.find((col) => col._id === columnId);
      if (!column) return;

      column.tasks = column.tasks.filter((task) => task._id !== taskId);
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

    setDeleteTaskModalOpen: (state, action: PayloadAction<boolean>) => {
      if (!state.data) return;
      state.data.isDeleteTaskModalOpen = action.payload;
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
        (col) => col._id === sourceColId,
      );
      const destinationColumn = state.data.columns.find(
        (col) => col._id === destColId,
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

    removeUserFromProject: (state, action: PayloadAction<string>) => {
      if (!state.data) return;

      state.data.members = state.data.members.filter(
        (user) => user._id !== action.payload,
      );
    },

    addTagToList: (state, action: PayloadAction<Tag>) => {
      if (!state.data) return;

      state.data.tags = [...state.data.tags, action.payload];
    },

    updateTagInList: (state, action: PayloadAction<Tag>) => {
      if (!state.data) return;

      if (action.payload) {
        state.data.tags = state.data.tags.map((tag) =>
          tag._id === action.payload._id
            ? {
                _id: tag._id,
                title: action.payload.title,
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

    removeTagFromList: (state, action: PayloadAction<string>) => {
      if (!state.data) return;
      state.data.tags = state.data.tags.filter(
        (tag) => tag._id !== action.payload,
      );
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
          assignees: task.assignees.filter(
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
          tags: task.tags.filter((tag) => tag._id !== action.payload),
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
            tag._id === action.payload._id ? { ...action.payload } : tag,
          ),
        })),
      }));
    },
    reorderColumns: (
      state,
      action: PayloadAction<{ columnId: string; direction: 'left' | 'right' }>,
    ) => {
      if (!state.data) return;

      const columns = state.data.columns;
      const currentIndex = columns.findIndex(
        (col) => col._id === action.payload.columnId,
      );

      const targetIndex =
        action.payload.direction === 'left'
          ? currentIndex - 1
          : currentIndex + 1;

      if (
        currentIndex < 0 ||
        targetIndex < 0 ||
        targetIndex >= columns.length
      ) {
        return;
      }

      const tempOrder = columns[currentIndex].order;
      columns[currentIndex].order = columns[targetIndex].order;
      columns[targetIndex].order = tempOrder;

      const temp = columns[currentIndex];
      columns[currentIndex] = columns[targetIndex];
      columns[targetIndex] = temp;
    },

    deleteProject: (state, action: PayloadAction<string>) => {
      if (!state.data) return;
      state.data.allProjects = state.data.allProjects.filter(
        (project) => project._id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCanBanBoards.pending, (state) => {
      state.status = Status.LOADING;
      state.message = '';
    });
    builder.addCase(fetchAllCanBanBoards.fulfilled, (state, action) => {
      const { results, page, totalPages } = action.payload;
      if (!state.data) return;

      if (page === 1) {
        state.data.allProjects = [...results];
      } else {
        state.data.allProjects = [...state.data.allProjects, ...results];
      }
      state.data.currentPage = page;
      state.data.totalPages = totalPages;
      state.status = Status.SUCCESS;
      state.message = '';
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
      state.data.isProjectSettingsOpened = false;
      state.message = '';
      state.data.info = null;
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
      state.data.members = project.members;
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
    builder.addCase(createCanBanColumn.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(createCanBanColumn.fulfilled, (state, action) => {
      if (!state.data) return;
      state.data.columns = [...state.data.columns, action.payload];
      state.status = Status.SUCCESS;
      state.message = '';
    });
    builder.addCase(createCanBanColumn.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });
    builder.addCase(updateCanBanColumn.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(updateCanBanColumn.fulfilled, (state, action) => {
      if (!state.data) return;
      state.data.columns = state.data.columns.map((column) =>
        column._id === action.payload._id
          ? { ...column, title: action.payload.title }
          : column,
      );
      state.status = Status.SUCCESS;
      state.message = '';
    });
    builder.addCase(updateCanBanColumn.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.message = String(action.payload);
    });

    builder.addCase(deleteCanBanColumn.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(deleteCanBanColumn.fulfilled, (state, action) => {
      if (!state.data) return;
      state.data.columns = state.data.columns.filter(
        (column) => column._id !== action.payload,
      );
      state.status = Status.SUCCESS;
      state.message = '';
    });
    builder.addCase(deleteCanBanColumn.rejected, (state, action) => {
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
  removeTagFromList,
  updateTags,
  updateUsersInProject,
  removeUserFromProject,
  setSelectedTag,
  deleteUserFromColumns,
  deleteTagFromColumns,
  editTagInColumns,
  setDeleteTaskModalOpen,
  reorderColumns,
  deleteProject,
} = canBanSlice.actions;
