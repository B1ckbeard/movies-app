import styles from "./styles.module.css";
import Carousel from "../Carousel/Carousel";
import Filters from "../Filters/Filters";
import { getSearchParamsByFilters } from "../../helpers/getSearchParamsByFilters";
import useFilters from "../../hooks/useFilters";
import { useSelector } from "react-redux";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";

const MoviesByFilters = () => {
  const { filters } = useSelector((state) => state.movies);
  const { movies, isLoading, error } = useFilters();

  if (error) {
    return <ErrorMessage error={error} />;
  }
  return (
    <section className={styles.filtersSection}>
      <h3 className={styles.title}>Фильмы по категориям</h3>
      <Filters />
      {movies.length > 0 && (
        <Carousel
          movies={movies}
          query={`/category/filters?q=${getSearchParamsByFilters(filters)}`}
          isLoading={isLoading}
          direction="row"
        />
      )}
    </section>
  );
};

export default MoviesByFilters;
