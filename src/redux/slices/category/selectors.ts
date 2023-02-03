import { RootState } from "../../store";

export const selectCategoryStatus = (state: RootState) => state.category.status;
export const selectCategoryInfo = (state: RootState) => state.category.category;
export const selectCategoryError = (state: RootState) => state.category.message;
