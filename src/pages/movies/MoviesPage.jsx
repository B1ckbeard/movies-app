import styles from "./styles.module.css";
import MoviesListWithPagination from "../../components/MoviesListWithPagination/MoviesListWithPagination";
import ButtonBack from "../../ui/ButtonBack/ButtonBack";
import { useMoviesData } from "../../hooks/useMoviesData";
import { useQueryParams } from "../../hooks/useQueryParams";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";

const MoviesPage = () => {
  const { moviesData, isLoading, error } = useMoviesData();
  const { title } = useQueryParams();

  return (
    <>
      <ButtonBack />
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          {title && <h1 className={styles.title}>{title}</h1>}
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
