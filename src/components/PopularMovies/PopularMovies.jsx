import { useEffect, useState } from "react";
import { getPopularMovies, getPopularSerials } from "../../moviesApi";
import Carousel from "../Carousel/Carousel";
import styles from "./styles.module.css";

const PopularMovies = () => {
  const [popularFilms, setPopularFilms] = useState([]);
  const [popularSerials, setPopularSerials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageNumber = 1;
  const pageSize = 10;

  const fetchPopularSerials = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getPopularSerials(pageNumber, pageSize);
      if (response.error || response.statusCode === 403) throw response;
      setPopularSerials(response.docs);
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

  const fetchPopularMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getPopularMovies(pageNumber, pageSize);
      if (response.error || response.statusCode === 403) throw response;
      setPopularFilms(response.docs);
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
    fetchPopularSerials();
    fetchPopularMovies();
  }, []);

  return (
    <>
      {!error && (
        <>
          <section className={styles.carouselSection}>
            <Carousel
              movies={popularFilms}
              title={"Популярные фильмы"}
              query={"/category/popular-films"}
              isLoading={isLoading}
            />
          </section>
          <section className={styles.carouselSection}>
            <Carousel
              movies={popularSerials}
              title={"Популярные сериалы"}
              query={"/category/popular-series"}
              isLoading={isLoading}
            />
          </section>
        </>
      )}
    </>
  );
};

export default PopularMovies;
