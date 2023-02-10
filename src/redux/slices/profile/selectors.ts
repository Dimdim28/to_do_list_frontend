import { RootState } from "../../store";
import { Profile } from "./types";

export const selectProfileStatus = (state: RootState) => state.profile.status;
export const selectUserProfile = (state: RootState): Profile | null =>
  state.profile.data;
export const selectProfileMessage = (state: RootState): string | undefined =>
  state.profile.message;
