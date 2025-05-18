import { RootState } from '../../store';
import { Profile } from '../auth/types';

import { DailyStats } from './types';

export const selectProfileStatus = (state: RootState) => state.profile.status;
export const selectUserProfile = (state: RootState): Profile | null =>
  state.profile.data;
export const selectProfileMessage = (state: RootState): string | undefined =>
  state.profile.message;
export const selectStats = (state: RootState): DailyStats[] =>
  state.profile.stats;
export const selectIsUserBanned = (state: RootState) =>
  state.profile.data?.isBanned;
