import styles from "./styles.module.css";
import { useMoviesData } from "@/pages/movies/utils/hooks/useMoviesData";
import { useQueryParams } from "@/pages/movies/utils/hooks/useQueryParams";
import { useScrollToTop } from "@/pages/movies/utils/hooks/useScrollToTop";
import MoviesListWithPagination from "./MoviesListWithPagination/MoviesListWithPagination";
import ButtonBack from "@/shared/ui/ButtonBack/ButtonBack";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";

const MoviesPage = () => {
  const { moviesData, isLoading, error } = useMoviesData();
  const movies = moviesData?.docs || [];
  const { title } = useQueryParams();
  useScrollToTop();

  return (
    <>
      <ButtonBack />
      {error ? (
        <ErrorMessage error={error} />
      ) : !isLoading && movies?.length === 0 ? (
        <h1 className={styles.title}>Не найдено</h1>
      ) : (
        <>
          <h1 className={styles.title}>{title || "Результаты поиска"}</h1>
          <MoviesListWithPagination movies={movies} isLoading={isLoading} />
        </>
      )}
    </>
  );
};

export default MoviesPage;
