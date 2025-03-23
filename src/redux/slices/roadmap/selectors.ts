import { RootState } from '../../store';

export const selectRoadmapData = (state: RootState) => state.roadmap.data;
export const selectRoadmapStatus = (state: RootState) => state.roadmap.status;
export const selectRoadmapMessage = (state: RootState) => state.roadmap.message;
export const selectRoadmapCurrentCategory = (state: RootState) =>
  state.roadmap.currentCategory;
export const selectRoadmapCurrentRow = (state: RootState) =>
  state.roadmap.currentRow;
export const selectRoadmapIsEditingCategoryOpened = (state: RootState) =>
  state.roadmap.isEditingCategoryOpened;
export const selectRoadmapIsDeletingCategoryOpened = (state: RootState) =>
  state.roadmap.isDeletingCategoryOpened;
export const selectRoadmapIsDeletingRowOpened = (state: RootState) =>
  state.roadmap.isDeletingRowOpened;
