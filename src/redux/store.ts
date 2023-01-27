import { taskReducer } from "./slices/tasks/tasks";
import { useDispatch } from "react-redux";
import { authReducer } from "./slices/auth/auth";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { auth: authReducer, task: taskReducer },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
