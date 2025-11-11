import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import { moviesApi } from "../api/moviesApi";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});
