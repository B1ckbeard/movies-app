import styles from "./styles.module.css";
import { useParams, useLocation, useNavigate } from "react-router";
import { getMoviesByCategory } from "../../moviesApi";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import MoviesList from "../../components/MoviesList/MoviesList";
import Button from "../../ui/Button/Button";

const MoviesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 10;

  const params = useParams();
  const category = params.category;

  const location = useLocation();
  const title = location?.state?.title;

  const navigate = useNavigate();

  const fetchMoviesByCategory = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getMoviesByCategory(
        currentPage,
        pageSize,
        category
      );
      if (response.error || response.statusCode === 403) throw response;
      setMovies(response);
    } catch (error) {
      console.error("Ошибка:", error);
      if (error.statusCode === 403) {
        setError("Ошибка - суточный лимит запросов исчерпан");
      } else {
        setError("Ошибка загрузки");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchMoviesByCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleGoBack = () => navigate(-1);

  return (
    <>
      <Button text={"< Назад"} onClick={handleGoBack} />
      <h1 className={styles.title}>{title ? title : category}</h1>
      {error ? (
        <h2 className={styles.error}>{error}</h2>
      ) : (
        <>
          {!isLoading && (
            <Pagination
              currentPage={currentPage}
              pagesCount={movies.pages - 1}
              paginationSize={5}
              handlePageClick={handlePageClick}
            />
          )}
          <MoviesList
            movies={movies.docs}
            type="banner"
            isLoading={isLoading}
          />
          {!isLoading && (
            <Pagination
              currentPage={currentPage}
              pagesCount={movies.pages - 1}
              paginationSize={5}
              handlePageClick={handlePageClick}
            />
          )}
        </>
      )}
    </>
  );
};

export default MoviesPage;
