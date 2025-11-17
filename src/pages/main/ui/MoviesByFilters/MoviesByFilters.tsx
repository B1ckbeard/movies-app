import styles from "./styles.module.css";
import { useCallback, useMemo } from "react";
import useFilters from "@/shared/hooks/useFilters";
import { useAppSelector } from "@/app/appStore";
import { MoviesCarousel, MoviesFilters } from "@/widgets/movie";
import { getSearchParamsByFilters } from "@/shared/helpers/getSearchParamsByFilters";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";
import { useLazyGetMoviesByFiltersQuery } from "@/entities/movie/api/moviesApi";

const MoviesByFilters = () => {
  const { filters } = useAppSelector((state) => state.movies);
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
    () => `/category/filters?q=${getSearchParamsByFilters(getApiFilters())}`,
    [filters]
  );

  if (error) {
    return <ErrorMessage error={error} />;
  }
  return (
    <section className={styles.filtersSection}>
      <h3 className={styles.title}>Фильмы по категориям</h3>
      <MoviesFilters onSearch={fetchMoviesByFilters} />
      {movies.length > 0 && (
        <MoviesCarousel
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
