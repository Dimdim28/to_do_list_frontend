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
export const selectProcessingColumnData = (state: RootState) =>
  (state.canban.data as CanBanState).processingColumnData;
export const selectErrorMessage = (state: RootState) => state.canban.message;
export const selectIsTaskInfoSideBarOpened = (state: RootState) =>
  state.canban.data?.isTaskInfoSideBarOpened;
export const selectIsProjectSettingsOpened = (state: RootState) =>
  (state.canban.data as CanBanState).isProjectSettingsOpened;
export const selectProjectMembers = (state: RootState) =>
  (state.canban.data as CanBanState).members;
export const selectIsProjectInfo = (state: RootState) =>
  (state.canban.data as CanBanState).info;
export const selectIsProjectTags = (state: RootState) =>
  (state.canban.data as CanBanState).info;
export const selectIsAddUserProjectModalOpened = (state: RootState) =>
  (state.canban.data as CanBanState).isAddUserToProjectModalOpened;
