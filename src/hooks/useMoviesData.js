import { useDispatch, useSelector } from "react-redux";
import {
  useGetMoviesByCategoryQuery,
  useGetMoviesByFiltersQuery,
  useGetMoviesByNameQuery,
} from "../api/moviesApi";
import { useEffect } from "react";
import { setPages } from "../store/moviesSlice";
import { useQueryParams } from "./useQueryParams";

export const useMoviesData = () => {
  const dispatch = useDispatch();
  const { filters, pages } = useSelector((state) => state.movies);
  const { currentPage, pageSize } = pages;
  const { category, searchQuery, hasFilters, hasSearch } = useQueryParams();

  const categoryQuery = useGetMoviesByCategoryQuery(
    { page_number: currentPage, page_size: pageSize, category },
    { skip: hasFilters || hasSearch || !category }
  );

  const filtersQuery = useGetMoviesByFiltersQuery(
    { page_number: currentPage, page_size: pageSize, filters },
    { skip: !hasFilters }
  );

  const searchQueryResult = useGetMoviesByNameQuery(
    { page_number: currentPage, page_size: pageSize, query: searchQuery },
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
    if (moviesData?.pages)
      dispatch(setPages({ key: "pagesCount", value: moviesData.pages }));
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
