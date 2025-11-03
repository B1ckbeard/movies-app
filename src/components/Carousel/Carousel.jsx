import { useRef, useState } from "react";
import styles from "./styles.module.css";
import MoviesList from "../MoviesList/MoviesList";
import { Link } from "react-router";
import ArrowButton from "../../ui/ArrowButton/ArrowButton";

const Carousel = ({ movies, title = "", query, isLoading, filters = null }) => {
  const [isFocused, setIsFocused] = useState(false);

  const sliderRef = useRef(null);
  const step = 440;

  const scrollLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -step, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: step, behavior: "smooth" });
  };

  const onMouseEnterAndLeave = (value) => {
    setIsFocused(value);
  };

  return (
    <>
      {movies && (
        <div
          className={styles.carouselContainer}
          onMouseEnter={() => onMouseEnterAndLeave(true)}
          onMouseLeave={() => onMouseEnterAndLeave(false)}
        >
          <div
            className={`${styles.carouselTitle} ${
              title !== "" ? styles.justifyBetween : styles.justifyEnd
            }`}
          >
            {title && (
              <h3>
                <Link
                  to={`${query}`}
                  state={{ title, filters }}
                  style={{ color: "inherit" }}
                >
                  {title}
                </Link>
              </h3>
            )}
            <Link
              to={`${query}`}
              state={{ title, filters }}
              style={{ color: "inherit" }}
            >
              {"Показать все >"}
            </Link>
          </div>
          <div className={styles.carousel} ref={sliderRef}>
            <MoviesList movies={movies} type="row" isLoading={isLoading} />
          </div>
          <ArrowButton
            side={"left"}
            onClick={scrollLeft}
            isFocused={isFocused}
          />
          <ArrowButton
            side={"right"}
            onClick={scrollRight}
            isFocused={isFocused}
          />
        </div>
      )}
    </>
  );
};

export default Carousel;
