import { RootState } from '../../store';

export const selectRoadmapData = (state: RootState) => state.roadmap.data;
export const selectRoadmapCurrentCategory = (state: RootState) =>
  state.roadmap.currentCategory;
export const selectRoadmapCurrentRow = (state: RootState) =>
  state.roadmap.currentRow;
export const selectRoadmapCurrentQuarter = (state: RootState) =>
  state.roadmap.currentQuarter;
export const selectRoadmapCurrentMilestone = (state: RootState) =>
  state.roadmap.currentMilestone;
export const selectRoadmapCurrentTask = (state: RootState) =>
  state.roadmap.currentTask;
export const selectRoadmapClickPosition = (state: RootState) =>
  state.roadmap.clickPosition;
export const selectRoadmapIsEditingCategoryOpened = (state: RootState) =>
  state.roadmap.isEditingCategoryOpened;
export const selectRoadmapIsDeletingCategoryOpened = (state: RootState) =>
  state.roadmap.isDeletingCategoryOpened;
export const selectRoadmapIsDeletingRowOpened = (state: RootState) =>
  state.roadmap.isDeletingRowOpened;
export const selectRoadmapIsDeletingQuarterOpened = (state: RootState) =>
  state.roadmap.isDeletingQuarterModalOpened;
export const selectRoadmapIsEditingMilestoneModalOpened = (state: RootState) =>
  state.roadmap.isEditingMilestoneModalOpened;
export const selectRoadmapIsDeletingMilestoneModalOpened = (state: RootState) =>
  state.roadmap.isDeletingMilestoneModalOpened;
export const selectRoadmapIsEditingTaskModalOpened = (state: RootState) =>
  state.roadmap.isEditingTaskModalOpened;
export const selectRoadmapIsDeletingTaskModalOpened = (state: RootState) =>
  state.roadmap.isDeletingTaskModalOpened;
