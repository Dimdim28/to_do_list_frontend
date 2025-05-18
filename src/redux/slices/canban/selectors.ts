import { RootState } from '../../store';

import { CanBanState } from './type';

export const selectColumns = (state: RootState) =>
  (state.canban.data as CanBanState).columns;
export const selectSelectedTask = (state: RootState) =>
  (state.canban.data as CanBanState).selectedTask;
export const isChangeColumnNameModalOpen = (state: RootState) =>
  (state.canban.data as CanBanState).isChangeColumnNameModalOpen;
export const isDeleteColumnModalOpen = (state: RootState) =>
  (state.canban.data as CanBanState).isDeleteColumnModalOpen;
export const isDeleteTaskModalOpen = (state: RootState) =>
  (state.canban.data as CanBanState).isDeleteTaskModalOpen;
export const selectProcessingColumnData = (state: RootState) =>
  (state.canban.data as CanBanState).processingColumnData;
export const selectErrorMessage = (state: RootState) => state.canban.message;
export const selectStatus = (state: RootState) => state.canban.status;
export const selectIsTaskInfoSideBarOpened = (state: RootState) =>
  state.canban.data?.isTaskInfoSideBarOpened;
export const selectIsProjectSettingsOpened = (state: RootState) =>
  (state.canban.data as CanBanState).isProjectSettingsOpened;
export const selectProjectMembers = (state: RootState) =>
  (state.canban.data as CanBanState).members;
export const selectIsProjectInfo = (state: RootState) =>
  (state.canban.data as CanBanState).info;
export const selectProjectTags = (state: RootState) =>
  (state.canban.data as CanBanState).tags;
export const selectIsAddUserProjectModalOpened = (state: RootState) =>
  (state.canban.data as CanBanState).isAddUserToProjectModalOpened;
export const selectIsAddTagProjectModalOpened = (state: RootState) =>
  (state.canban.data as CanBanState).isAddTagToProjectModalOpened;
export const selectSelectedTag = (state: RootState) =>
  (state.canban.data as CanBanState).selectedTag;
export const selectAllProjects = (state: RootState) =>
  (state.canban.data as CanBanState).allProjects;
export const selectCanBanCreatorId = (state: RootState) =>
  (state.canban.data as CanBanState).creatorId;
export const selectCurrentPage = (state: RootState) =>
  (state.canban.data as CanBanState).currentPage;
export const selectTotalPages = (state: RootState) =>
  (state.canban.data as CanBanState).totalPages;
