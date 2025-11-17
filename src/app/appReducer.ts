import { combineReducers } from "@reduxjs/toolkit";
import moviesReducer from "@/entities/movie/model/moviesSlice";
import { moviesApi } from "@/entities/movie/api/moviesApi";

export const rootReducer = combineReducers({
  movies: moviesReducer,
  [moviesApi.reducerPath]: moviesApi.reducer,
});
