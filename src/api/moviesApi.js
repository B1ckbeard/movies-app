import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSearchParamsByFilters } from "../helpers/getSearchParamsByFilters";

const BASE_URL = import.meta.env.VITE_MOVIES_BASE_API_URL;
const API_KEY = import.meta.env.VITE_MOVIES_API_KEY;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("accept", "application/json");
    headers.set("X-API-KEY", API_KEY);
    return headers;
  },
});

const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (!result) {
    console.error("Base query returned undefined result");
    return {
      error: {
        data: {
          userMessage: "Неизвестная ошибка при выполнении запроса",
        },
      },
    };
  }
  if (result.error) {
    const { status, data } = result.error;
    if (status === 403) {
      console.error("API limit exceeded:", result.error);
      result.error = {
        ...result.error,
        data: {
          ...data,
          userMessage: "Превышен суточный лимит запросов. Попробуйте завтра.",
        },
      };
    } else if (status === 404) {
      console.error("Запрашиваемые данные не найдены:", result.error);
      result.error = {
        ...result.error,
        data: {
          ...data,
          userMessage: "Запрашиваемые данные не найдены",
        },
      };
    } else if (status >= 500) {
      console.error(
        "Временные проблемы с сервером. Попробуйте позже:",
        result.error
      );
      result.error = {
        ...result.error,
        data: {
          ...data,
          userMessage: "Временные проблемы с сервером. Попробуйте позже",
        },
      };
    } else {
      console.error("Произошла непредвиденная ошибка:", result.error);
      result.error = {
        ...result.error,
        data: {
          ...data,
          userMessage: data?.message || "Произошла непредвиденная ошибка",
        },
      };
    }
  }
  return result;
};

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Movies", "Movie"],
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: (page_number = 1, page_size = 30) =>
        `movie?page=${page_number}&limit=${page_size}`,
      providesTags: ["Movies"],
    }),

    getMovieById: builder.query({
      query: (id) => `movie/${id}`,
      providesTags: (id) => [{ type: "Movie", id }],
    }),

    getMoviesByCategory: builder.query({
      query: ({ page_number = 1, page_size = 30, category }) =>
        `movie?page=${page_number}&limit=${page_size}&lists=${category}`,
      providesTags: ["Movies"],
    }),

    getMoviesInCinema: builder.query({
      query: () => `movie?page=1&limit=10&lists=top10-hd`,
      providesTags: ["Movies"],
    }),

    getMoviesCategoriesList: builder.query({
      query: (page_number = 1, page_size = 30) =>
        `list?page=${page_number}&limit=${page_size}`,
    }),

    getMoviesByFilters: builder.query({
      query: ({ page_number = 1, page_size = 30, filters = {} }) => {
        const params = getSearchParamsByFilters(filters);
        return `movie?page=${page_number}&limit=${page_size}&${params}`;
      },
      providesTags: ["Movies"],
    }),

    getMoviesByName: builder.query({
      query: ({ page_number = 1, page_size = 30, query }) =>
        `movie/search?page=${page_number}&limit=${page_size}&query=${query}`,
      providesTags: ["Movies"],
    }),

    getRandomMovie: builder.query({
      query: () => `movie/random`,
    }),
  }),
});

export const {
  useGetAllMoviesQuery,
  useGetMovieByIdQuery,
  useGetMoviesByCategoryQuery,
  useGetMoviesInCinemaQuery,
  useGetMoviesCategoriesListQuery,
  useLazyGetMoviesByFiltersQuery,
  useGetMoviesByFiltersQuery,
  useGetMoviesByNameQuery,
  useGetRandomMovieQuery,
} = moviesApi;
