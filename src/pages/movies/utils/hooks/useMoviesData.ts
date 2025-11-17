import { useEffect } from "react";
import { useQueryParams } from "./useQueryParams";
import { useAppDispatch, useAppSelector } from "@/app/appStore";
import { setPages } from "@/entities/movie/model/moviesSlice";
import useFilters from "@/shared/hooks/useFilters";
import {
  useGetMoviesByCategoryQuery,
  useGetMoviesByFiltersQuery,
  useGetMoviesByNameQuery,
} from "@/entities/movie/api/moviesApi";

interface MoviesDataResponse {
  pages?: number;
  docs?: any[];
  total?: number;
  limit?: number;
  page?: number;
}

interface UseMoviesDataReturn {
  moviesData: MoviesDataResponse | undefined;
  isLoading: boolean;
  error: any;
}

export const useMoviesData = (): UseMoviesDataReturn => {
  const dispatch = useAppDispatch();
  const { getApiFilters } = useFilters();
  const { pages } = useAppSelector((state) => state.movies);
  const { currentPage, pageSize } = pages;
  const { category, searchQuery, hasFilters, hasSearch } = useQueryParams();

  const categoryQuery = useGetMoviesByCategoryQuery(
    { page_number: currentPage, page_size: pageSize, category: category || "" },
    { skip: hasFilters || hasSearch || !category }
  );

  const filtersQuery = useGetMoviesByFiltersQuery(
    { page_number: currentPage, page_size: pageSize, filters: getApiFilters() },
    { skip: !hasFilters }
  );

  const searchQueryResult = useGetMoviesByNameQuery(
    { page_number: currentPage, page_size: pageSize, query: searchQuery || "" },
    { skip: hasFilters || !hasSearch }
  );

  const moviesData = hasFilters
    ? filtersQuery.data
    : hasSearch
    ? searchQueryResult.data
    : categoryQuery.data;

  const isLoading = hasFilters
    ? filtersQuery.isLoading
    : hasSearch
    ? searchQueryResult.isLoading
    : categoryQuery.isLoading;

  const error = hasFilters
    ? filtersQuery.error
    : hasSearch
    ? searchQueryResult.error
    : categoryQuery.error;

  useEffect(() => {
    if (moviesData?.pages) {
      dispatch(setPages({ key: "pagesCount", value: moviesData.pages }));
    } else {
      dispatch(setPages({ key: "pagesCount", value: 0 }));
    }
  }, [dispatch, moviesData]);

  useEffect(() => {
    dispatch(setPages({ key: "currentPage", value: 1 }));
  }, [category, searchQuery, hasFilters, dispatch]);

  return {
    moviesData,
    isLoading,
    error,
  };
};
