import { RootState } from "./../../store";

export const selectIsAuth = (state: RootState) => Boolean(state.auth.profile);
