import styles from "./styles.module.css";
import MoviesListWithPagination from "@/components/MoviesListWithPagination/MoviesListWithPagination";
import { useMoviesData } from "@/hooks/useMoviesData";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import ButtonBack from "@/ui/ButtonBack/ButtonBack";
import ErrorMessage from "@/ui/ErrorMessage/ErrorMessage";

const MoviesPage = () => {
  const { moviesData, isLoading, error } = useMoviesData();
  const { title } = useQueryParams();
  useScrollToTop();

  return (
    <>
      <ButtonBack />
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <h1 className={styles.title}>{title || "Результаты поиска"}</h1>
          <MoviesListWithPagination
            movies={moviesData?.docs || []}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  );
};

export default MoviesPage;
