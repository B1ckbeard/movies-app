import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { getMoviesByCategory } from "../../moviesApi";
import { Link } from "react-router";
import ArrowButton from "../../ui/ArrowButton/ArrowButton";

const Slider = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMovie, setCurrentMovie] = useState(movies[currentIndex]);
  // const [isLoading, setIsLoading] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState(null);

  const slideInterval = 5000;

  const fetchMoviesInCimema = async () => {
    try {
      // setIsLoading(true);
      setError(null);
      const response = await getMoviesByCategory(1, 10, "top10-hd");
      if (response.error || response.statusCode === 403) throw response;
      setMovies(response.docs);
    } catch (error) {
      console.error("Ошибка:", error);
      if (error.statusCode === 403) {
        setError("Ошибка - суточный лимит запросов исчерпан");
      } else {
        setError("Ошибка загрузки");
      }
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesInCimema();
  }, []);

  useEffect(() => {
    setCurrentMovie(movies[currentIndex]);
  }, [movies, currentIndex]);

  const handleNextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  }, [movies.length]);

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNextSlide, slideInterval);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, handleNextSlide]);

  const onMouseEnterAndLeave = (value) => {
    setIsFocused(value);
    setIsPaused(value);
  };

  return (
    <>
      {error && <h2 style={{ textAlign: "center" }}>{error}</h2>}
      {currentMovie && !error && (
        <section
          className={styles.sliderSection}
          onMouseEnter={() => onMouseEnterAndLeave(true)}
          onMouseLeave={() => onMouseEnterAndLeave(false)}
          style={{
            backgroundImage: `url(${currentMovie.backdrop.url})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className={styles.slider}>
            <h2 className={styles.title}>УЖЕ В КИНО</h2>
            <div className={styles.info}>
              <h1 className={styles.name}>
                <Link
                  to={`/movie/${currentMovie.id}`}
                  style={{ color: "inherit" }}
                >
                  {currentMovie.name}
                </Link>
              </h1>
            </div>
          </div>
          <ul className={styles.pagination}>
            {movies.map((item, index) => (
              <li
                key={item.id}
                className={`${styles.navItem} ${
                  currentMovie.id === item.id ? styles.active : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              ></li>
            ))}
          </ul>
          <div className={styles.darkenedWrapper}></div>
          <ArrowButton
            side={"left"}
            offset={20}
            onClick={handlePrevSlide}
            isFocused={isFocused}
          />
          <ArrowButton
            side={"right"}
            offset={20}
            onClick={handleNextSlide}
            isFocused={isFocused}
          />
        </section>
      )}
    </>
  );
};

export default Slider;
