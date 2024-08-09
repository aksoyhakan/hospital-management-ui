import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import { authApi } from "../services/auth";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
