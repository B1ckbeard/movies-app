import styles from "./styles.module.css";
import { useParams, useLocation, useNavigate } from "react-router";
import { getMoviesByCategory, getMoviesByFilters } from "../../moviesApi";
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
  const { title, filters } = location.state;

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
      console.log(response);
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

  const fetchMoviesByFilters = async () => {
    setIsLoading(true);
    try {
      const response = await getMoviesByFilters(filters, currentPage, pageSize);
      console.log(response);
      setMovies(response);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (filters) {
      console.log("filters", filters);
      fetchMoviesByFilters();
    } else {
      fetchMoviesByCategory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleGoBack = () => navigate(-1) || navigate("/");

  return (
    <>
      <Button
        text={"< Назад"}
        onClick={handleGoBack}
        style={{ marginBottom: "30px" }}
      />
      {error ? (
        <h2 className={styles.error}>{error}</h2>
      ) : (
        <>
          <h1 className={styles.title}>{title}</h1>
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
            type="column"
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
