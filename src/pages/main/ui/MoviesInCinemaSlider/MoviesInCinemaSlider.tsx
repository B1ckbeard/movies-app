import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router";
import { Movie } from "@/shared/interfaces";
import ArrowButton from "@/shared/ui/ArrowButton/ArrowButton";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";
import { useGetMoviesInCinemaQuery } from "@/entities/movie/api/moviesApi";

const MoviesInCinemaSlider = () => {
  const { data, error, isLoading } = useGetMoviesInCinemaQuery(undefined);
  const movies = data?.docs || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const slideInterval = 5000;

  const currentMovie = movies[currentIndex];

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

  const onMouseEnterAndLeave = (value: boolean) => {
    setIsFocused(value);
    setIsPaused(value);
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (isLoading) {
    return <div className={styles.skeleton}>Загрузка...</div>;
  }

  if (!currentMovie) {
    return null;
  }
  return (
    <section
      className={styles.sliderSection}
      onMouseEnter={() => onMouseEnterAndLeave(true)}
      onMouseLeave={() => onMouseEnterAndLeave(false)}
      style={{
        backgroundImage: `url(${currentMovie.backdrop?.url})`,
      }}
    >
      <div className={styles.slider}>
        <h1 className={styles.title}>УЖЕ В КИНО</h1>
        <div className={styles.info}>
          <h2 className={styles.name}>
            <Link to={`/movie/${currentMovie.id}`} style={{ color: "inherit" }}>
              {currentMovie.name}
            </Link>
          </h2>
        </div>
      </div>
      <ul className={styles.pagination}>
        {movies.map((item: Movie, index: number) => (
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
  );
};

export default MoviesInCinemaSlider;
