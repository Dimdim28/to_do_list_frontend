import { RootState } from '../../store';

import { CanBanState } from './type';

export const selectColumns = (state: RootState) =>
  (state.canban.data as CanBanState).columns;
export const selectSelectedTask = (state: RootState) =>
  (state.canban.data as CanBanState).selectedTask;
export const isChangeColumnNameModalOpen = (state: RootState) =>
  (state.canban.data as CanBanState).isChangeColumnNameModalOpen;
export const selectEditingColumnData = (state: RootState) =>
  (state.canban.data as CanBanState).editingColumnData;
export const selectErrorMessage = (state: RootState) => state.canban.message;
