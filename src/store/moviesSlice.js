import { createSlice } from "@reduxjs/toolkit";

const defaultFilters = {
  "genres.name": "",
  "countries.name": "",
  year: "",
  "rating.kp": "",
};

const defaultPages = {
  currentPage: 1,
  pagesCount: 1,
  pageSize: 30,
};

const initialState = {
  // currentMovies: [],
  // moviesInCinema: [],
  // popularMovies: [],
  // filteredMovies: [],
  filters: defaultFilters,
  pages: defaultPages,
  // currentMovie: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // setCurrentMovies: (state, action) => {
    //   state.currentMovies = action.payload;
    // },
    // setMoviesInCinema: (state, action) => {
    //   state.moviesInCinema = action.payload;
    // },
    // setPopularMovies: (state, action) => {
    //   state.popularMovies = action.payload;
    // },
    // setFilteredMovies: (state, action) => {
    //   state.filteredMovies = action.payload;
    // },
    // setCurrentMovie: (state, action) => {
    //   state.currentMovie = action.payload;
    // },
    setFilters: (state, action) => {
      const { key, value } = action.payload;
      state.filters = { ...state.filters, [key]: value };
    },
    resetFilters: (state) => {
      state.filters = defaultFilters;
    },
    setPages: (state, action) => {
      const { key, value } = action.payload;
      state.pages = { ...state.pages, [key]: value };
    },
    resetPages: (state) => {
      state.pages = defaultPages;
    },
  },
});

export const {
  // setCurrentMovies,
  // setMoviesInCinema,
  // setPopularMovies,
  // setFilteredMovies,
  // setCurrentMovie,
  setFilters,
  resetFilters,
  setPages,
  resetPages,
} = moviesSlice.actions;

export default moviesSlice.reducer;
