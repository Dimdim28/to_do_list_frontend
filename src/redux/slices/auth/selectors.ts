import { Status, Theme } from '../../../types/shared';
import { RootState } from './../../store';
import { Profile } from './types';

export const selectIsAuth = (state: RootState) => Boolean(state.auth.profile);
export const selectIsChecked = (state: RootState) =>
  state.auth.status !== Status.LOADING;
export const selectIsRegistered = (state: RootState) =>
  Boolean(state.auth.profile);
export const selectProfile = (state: RootState): Profile | null =>
  state.auth.profile;
export const selectMessage = (state: RootState): string | undefined =>
  state.auth.message;
export const selectTheme = (state: RootState): Theme => state.auth.theme;
export const selectLanguage = (state: RootState) => state.auth.lang;
