import { categoryReducer } from "./slices/category/category";
import { homeReducer } from "./slices/home/home";
import { useDispatch } from "react-redux";
import { authReducer } from "./slices/auth/auth";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { auth: authReducer, home: homeReducer, category: categoryReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
