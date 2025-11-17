import { getSearchParamsByFilters } from "@/shared/helpers/getSearchParamsByFilters";
import { FiltersState } from "@/entities/movie/model/moviesSlice";
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_MOVIES_BASE_API_URL as string;
const API_KEY = import.meta.env.VITE_MOVIES_API_KEY as string;

interface ErrorData {
  message?: string;
}

interface CustomError {
  status?: number;
  data?: ErrorData;
}

interface PaginationParams {
  page_number?: number;
  page_size?: number;
}

interface CategoryParams extends PaginationParams {
  category: string;
}

interface FiltersParams extends PaginationParams {
  filters?: FiltersState;
}

interface SearchParams extends PaginationParams {
  query: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("accept", "application/json");
    headers.set("X-API-KEY", API_KEY);
    return headers;
  },
});

const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError & CustomError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (!result) {
    console.error("Base query returned undefined result");
    return {
      error: {
        data: {
          message: "Неизвестная ошибка при выполнении запроса",
        },
      } as FetchBaseQueryError & CustomError,
    };
  }

  if (result.error) {
    const { status, data } = result.error;
    const errorData = data as ErrorData;

    const statusNumber =
      typeof status === "string" ? parseInt(status, 10) : status;

    let message = errorData?.message || "Произошла непредвиденная ошибка";

    if (statusNumber === 403) {
      console.error("API limit exceeded:", result.error);
      message = "Превышен суточный лимит запросов. Попробуйте завтра.";
    } else if (statusNumber === 404) {
      console.error("Запрашиваемые данные не найдены:", result.error);
      message = "Запрашиваемые данные не найдены";
    } else if (statusNumber && statusNumber >= 500) {
      console.error(
        "Временные проблемы с сервером. Попробуйте позже:",
        result.error
      );
      message = "Временные проблемы с сервером. Попробуйте позже";
    }

    return {
      error: {
        ...result.error,
        data: {
          message,
        },
      } as FetchBaseQueryError & CustomError,
    };
  }

  return result;
};

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Movies", "Movie"],
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: (page_number: number = 1, page_size: number = 30) =>
        `movie?page=${page_number}&limit=${page_size}`,
      providesTags: ["Movies"],
    }),

    getMovieById: builder.query({
      query: (id: number | string) => `movie/${id}`,
      providesTags: (id) => [{ type: "Movie" as const, id }],
    }),

    getMoviesByCategory: builder.query({
      query: ({ page_number = 1, page_size = 30, category }: CategoryParams) =>
        `movie?page=${page_number}&limit=${page_size}&lists=${category}`,
      providesTags: ["Movies"],
    }),

    getMoviesInCinema: builder.query({
      query: () => `movie?page=1&limit=10&lists=top10-hd`,
      providesTags: ["Movies"],
    }),

    getMoviesCategoriesList: builder.query({
      query: (page_number: number = 1, page_size: number = 30) =>
        `list?page=${page_number}&limit=${page_size}`,
    }),

    getMoviesByFilters: builder.query({
      query: ({
        page_number = 1,
        page_size = 30,
        filters = {},
      }: FiltersParams) => {
        const params = getSearchParamsByFilters(filters);
        return `movie?page=${page_number}&limit=${page_size}&${params}`;
      },
      providesTags: ["Movies"],
    }),

    getMoviesByName: builder.query({
      query: ({ page_number = 1, page_size = 30, query }: SearchParams) =>
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
