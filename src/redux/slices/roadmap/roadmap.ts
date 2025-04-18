import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  Category,
  Milestone,
  Quarter,
  RoadmapData,
  RoadmapSliceState,
  Row,
  Task,
} from './type';

const initialState: RoadmapSliceState = {
  data: null,
  currentCategory: null,
  currentRow: null,
  currentMilestone: null,
  currentQuarter: null,
  currentTask: null,
  isDeletingCategoryOpened: false,
  isEditingCategoryOpened: false,
  isDeletingRowOpened: false,
  isDeletingQuarterModalOpened: false,
  isEditingMilestoneModalOpened: false,
  isDeletingMilestoneModalOpened: false,
  isEditingTaskModalOpened: false,
  isDeletingTaskModalOpened: false,
  clickPosition: 0,
};

const canBanSlice = createSlice({
  name: 'roadmap',
  initialState,
  reducers: {
    updateRoadmapData: (state, action: PayloadAction<RoadmapData>) => {
      state.data = action.payload;
    },

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

    setRoadmapCurrentRow: (state, action: PayloadAction<Row | null>) => {
      state.currentRow = action.payload;
    },

    setRoadmapIsDeletingRowOpened: (state, action: PayloadAction<boolean>) => {
      state.isDeletingRowOpened = action.payload;
    },

    editRoadmapCategory: (
      state,
      action: PayloadAction<{ id: string; color: string; title: string }>,
    ) => {
      if (!state.data) return;

      state.data.categories = state.data.categories.map((category) =>
        category._id === action.payload.id
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
        (category) => category._id !== action.payload,
      );
    },

    addRoadmapCategory: (state, action: PayloadAction<Category>) => {
      if (!state.data) return;

      state.data.categories = [...state.data.categories, action.payload];
    },

    addRoadmapNewQuarter: (state) => {
      if (!state.data) return;

      const length = state.data.quarters.length;

      state.data.quarters = [
        ...state.data.quarters,
        {
          _id: `q${length + 1}`,
          start: 100 * length,
          end: 100 * (length + 1),
          title: `Q${length + 1}`,
        },
      ];
    },

    addRoadmapNewLineToCategory: (
      state,
      action: PayloadAction<{
        rowId: string;
        categoryId: string;
      }>,
    ) => {
      if (!state.data) return;

      state.data.categories = state.data.categories.map((category) =>
        category._id === action.payload.categoryId
          ? {
              ...category,
              rows: [
                ...category.rows,
                {
                  _id: action.payload.rowId,
                  tasks: [],
                },
              ],
            }
          : category,
      );
    },

    updateRoadmapTaskInCategory: (
      state,
      action: PayloadAction<{
        categoryId: string;
        rowId: string;
        taskId: string;
        updates: Partial<{
          start: number;
          end: number;
          progress: number;
          title: string;
        }>;
      }>,
    ) => {
      const { categoryId, rowId, taskId, updates } = action.payload;
      const category = state.data?.categories.find((c) => c._id === categoryId);
      if (!category) return;
      const row = category.rows.find((r) => r._id === rowId);
      if (!row) return;
      const task = row.tasks.find((t) => t._id === taskId);
      if (!task) return;

      Object.assign(task, updates);
    },

    moveRoadmapTask: (
      state,
      action: PayloadAction<{
        fromCategoryId: string;
        fromRowId: string;
        toCategoryId: string;
        toRowId: string;
        task: Task;
      }>,
    ) => {
      const { fromCategoryId, fromRowId, toCategoryId, toRowId, task } =
        action.payload;

      if (!state.data) return;
      if (fromCategoryId === toCategoryId && fromRowId === toRowId) return;

      state.data.categories = state.data.categories.map((category) => {
        let modified = false;

        const newRows = category.rows.map((row) => {
          if (
            category._id === fromCategoryId &&
            row._id === fromRowId &&
            (fromCategoryId !== toCategoryId || fromRowId !== toRowId)
          ) {
            modified = true;
            return {
              ...row,
              tasks: row.tasks.filter((t) => t._id !== task._id),
            };
          }

          if (category._id === toCategoryId && row._id === toRowId) {
            modified = true;
            return {
              ...row,
              tasks: [...row.tasks, task],
            };
          }

          return row;
        });

        return modified ? { ...category, rows: newRows } : category;
      });
    },

    updateMilestonePosition: (
      state,
      action: PayloadAction<{ id: string; position: number }>,
    ) => {
      if (!state.data) return;

      const { id, position } = action.payload;

      state.data.milestones = state.data.milestones.map((milestone) =>
        milestone._id === id
          ? {
              ...milestone,
              position,
            }
          : milestone,
      );
    },

    deleteRoadmapRow: (
      state,
      action: PayloadAction<{ rowId: string; categoryId: string }>,
    ) => {
      if (!state.data) return;

      state.data.categories = state.data.categories.map((category) =>
        category._id === action.payload.categoryId
          ? {
              ...category,
              rows: category.rows.filter(
                (row) => row._id !== action.payload.rowId,
              ),
            }
          : category,
      );
    },

    setRoadmapCurrentQuarter: (
      state,
      action: PayloadAction<Quarter | null>,
    ) => {
      state.currentQuarter = action.payload;
    },

    setRoadmapIsDeletingQuarterOpened: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isDeletingQuarterModalOpened = action.payload;
    },

    deleteRoadmapQuarter: (state, action: PayloadAction<Quarter>) => {
      if (!state.data) return;

      const quarter = action.payload;
      const { _id, start, end } = quarter;

      state.data.quarters = state.data.quarters.filter((q) => q._id !== _id);

      state.data.milestones = state.data.milestones.filter(
        (m) => m.position < start || m.position >= end,
      );

      state.data.categories = state.data.categories.map((category) => ({
        ...category,
        rows: category.rows.map((row) => ({
          ...row,
          tasks: row.tasks.filter((task) => {
            if (task.start >= start - 10) return false;

            if (task.end > start) {
              task.end = start;
            }

            return true;
          }),
        })),
      }));
    },

    setRoadmapCurrentMilestone: (
      state,
      action: PayloadAction<Milestone | null>,
    ) => {
      state.currentMilestone = action.payload;
    },

    setRoadmapIsEditingMilestoneOpened: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isEditingMilestoneModalOpened = action.payload;
    },

    setRoadmapIsDeletingMilestoneOpened: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isDeletingMilestoneModalOpened = action.payload;
    },

    deleteRoadmapMilestone: (state, action: PayloadAction<string>) => {
      if (!state.data) return;

      state.data.milestones = state.data.milestones.filter(
        (milestone) => milestone._id !== action.payload,
      );
    },

    editRoadmapMilestone: (state, action: PayloadAction<Milestone>) => {
      if (!state.data) return;

      state.data.milestones = state.data.milestones.map((milestone) =>
        milestone._id === action.payload._id ? action.payload : milestone,
      );
    },

    addRoadmapMilestone: (state, action: PayloadAction<Milestone>) => {
      if (!state.data) return;

      state.data.milestones = [...state.data.milestones, action.payload];
    },

    setRoadmapCurrentTask: (state, action: PayloadAction<Task | null>) => {
      state.currentTask = action.payload;
    },

    setRoadmapIsEditingTaskOpened: (state, action: PayloadAction<boolean>) => {
      state.isEditingTaskModalOpened = action.payload;
    },

    setRoadmapIsDeletingTaskOpened: (state, action: PayloadAction<boolean>) => {
      state.isDeletingTaskModalOpened = action.payload;
    },

    deleteRoadmapTask: (
      state,
      action: PayloadAction<{
        categoryId: string;
        rowId: string;
        taskId: string;
      }>,
    ) => {
      if (!state.data) return;

      const { categoryId, rowId, taskId } = action.payload;

      state.data.categories = state.data.categories.map((category) => {
        if (category._id !== categoryId) return category;

        return {
          ...category,
          rows: category.rows.map((row) => {
            if (row._id !== rowId) return row;

            return {
              ...row,
              tasks: row.tasks.filter((task) => task._id !== taskId),
            };
          }),
        };
      });
    },

    editRoadmapTask: (
      state,
      action: PayloadAction<{
        categoryId: string;
        rowId: string;
        task: Task;
      }>,
    ) => {
      if (!state.data) return;

      const { categoryId, rowId, task } = action.payload;

      state.data.categories = state.data.categories.map((category) => {
        if (category._id !== categoryId) return category;

        return {
          ...category,
          rows: category.rows.map((row) => {
            if (row._id !== rowId) return row;

            return {
              ...row,
              tasks: row.tasks.map((t) => (t._id === task._id ? task : t)),
            };
          }),
        };
      });
    },

    addRoadmapTask: (
      state,
      action: PayloadAction<{
        categoryId: string;
        rowId: string;
        task: Task;
      }>,
    ) => {
      if (!state.data) return;

      const { categoryId, rowId, task } = action.payload;

      state.data.categories = state.data.categories.map((category) => {
        if (category._id !== categoryId) return category;

        return {
          ...category,
          rows: category.rows.map((row) => {
            if (row._id !== rowId) return row;

            return {
              ...row,
              tasks: [...row.tasks, task],
            };
          }),
        };
      });
    },

    setRoadmapClickPosition: (state, action: PayloadAction<number>) => {
      state.clickPosition = action.payload;
    },
  },
});

export const roadmapReducer = canBanSlice.reducer;
export const {
  updateRoadmapData,
  setRoadmapCurrentCategory,
  setRoadmapIsDeletingCategoryOpened,
  setRoadmapIsEditingCategoryOpened,
  editRoadmapCategory,
  deleteRoadmapCategory,
  addRoadmapCategory,
  addRoadmapNewQuarter,
  addRoadmapNewLineToCategory,
  updateRoadmapTaskInCategory,
  moveRoadmapTask,
  updateMilestonePosition,
  setRoadmapCurrentRow,
  setRoadmapIsDeletingRowOpened,
  deleteRoadmapRow,
  setRoadmapCurrentQuarter,
  setRoadmapIsDeletingQuarterOpened,
  deleteRoadmapQuarter,
  setRoadmapCurrentMilestone,
  setRoadmapIsEditingMilestoneOpened,
  setRoadmapIsDeletingMilestoneOpened,
  deleteRoadmapMilestone,
  editRoadmapMilestone,
  addRoadmapMilestone,
  setRoadmapCurrentTask,
  setRoadmapIsEditingTaskOpened,
  setRoadmapIsDeletingTaskOpened,
  deleteRoadmapTask,
  addRoadmapTask,
  editRoadmapTask,
  setRoadmapClickPosition,
} = canBanSlice.actions;
