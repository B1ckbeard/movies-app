import styles from "./styles.module.css";
import Carousel from "../Carousel/Carousel";
import Filters from "../Filters/Filters";
import { getSearchParamsByFilters } from "../../helpers/getSearchParamsByFilters";
import useFilters from "../../hooks/useFilters";
import { useSelector } from "react-redux";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import { useLazyGetMoviesByFiltersQuery } from "../../api/moviesApi";
import { useCallback, useMemo } from "react";

const MoviesByFilters = () => {
  const { filters } = useSelector((state) => state.movies);
  const { getApiFilters } = useFilters();

  const [fetchMovies, { data, isLoading, error }] =
    useLazyGetMoviesByFiltersQuery();

  const fetchMoviesByFilters = useCallback(() => {
    return fetchMovies({
      page_number: 1,
      page_size: 30,
      filters: getApiFilters(),
    });
  }, [fetchMovies, getApiFilters]);

  const movies = useMemo(() => data?.docs || [], [data?.docs]);

  const queryString = useMemo(
    () => `/category/filters?q=${getSearchParamsByFilters(filters)}`,
    [filters]
  );

  if (error) {
    return <ErrorMessage error={error} />;
  }
  return (
    <section className={styles.filtersSection}>
      <h3 className={styles.title}>Фильмы по категориям</h3>
      <Filters onSearch={fetchMoviesByFilters} />
      {movies.length > 0 && (
        <Carousel
          movies={movies}
          query={queryString}
          isLoading={isLoading}
          direction="row"
        />
      )}
    </section>
  );
};

export default MoviesByFilters;
