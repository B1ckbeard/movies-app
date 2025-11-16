import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
  "genres.name"?: string;
  "countries.name"?: string;
  year?: string;
  "rating.kp"?: string;
}

interface PagesState {
  currentPage: number;
  pagesCount: number;
  pageSize: number;
}

interface MoviesState {
  filters: FiltersState;
  pages: PagesState;
}

const defaultFilters: FiltersState = {
  "genres.name": "",
  "countries.name": "",
  year: "",
  "rating.kp": "",
};

const defaultPages: PagesState = {
  currentPage: 1,
  pagesCount: 1,
  pageSize: 30,
};

const initialState: MoviesState = {
  filters: defaultFilters,
  pages: defaultPages,
};

interface SetFiltersPayload {
  key: keyof FiltersState;
  value: string;
}

interface SetPagesPayload {
  key: keyof PagesState;
  value: number;
}

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<SetFiltersPayload>) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    resetFilters: (state) => {
      state.filters = defaultFilters;
    },
    setPages: (state, action: PayloadAction<SetPagesPayload>) => {
      const { key, value } = action.payload;
      state.pages[key] = value;
    },
    resetPages: (state) => {
      state.pages = defaultPages;
    },
  },
});

export const { setFilters, resetFilters, setPages, resetPages } =
  moviesSlice.actions;

export default moviesSlice.reducer;
