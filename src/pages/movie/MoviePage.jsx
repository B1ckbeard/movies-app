import { useEffect, useState } from "react";
import { getMovieById } from "../../moviesApi";
import { useParams, useNavigate } from "react-router";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import styles from "./styles.module.css";
import Button from "../../ui/Button/Button";

const MoviePage = () => {
  const params = useParams();
  const movieId = params.id;
  const navigate = useNavigate();

  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovieById = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getMovieById(id);
      if (response.error || response.statusCode === 403) throw response;
      setMovie(response);
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

  useEffect(() => {
    fetchMovieById(movieId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoBack = () => navigate(-1) || navigate("/");

  return (
    <>
      <Button text={"< Назад"} onClick={handleGoBack} style={{marginBottom: '30px'}}/>
      {error ? (
        <h2 className={styles.error}>{error}</h2>
      ) : (
        <MovieDetails movie={movie} isLoading={isLoading} />
      )}
    </>
  );
};

export default MoviePage;
