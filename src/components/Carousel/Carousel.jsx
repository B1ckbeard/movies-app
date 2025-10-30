import { useRef, useState } from "react";
import styles from "./styles.module.css";
import MoviesList from "../MoviesList/MoviesList";
import { Link } from "react-router";
import ArrowButton from "../../ui/ArrowButton/ArrowButton";

const Carousel = ({ movies, title, query, isLoading }) => {
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
    <div
      className={styles.carouselSection}
      onMouseEnter={() => onMouseEnterAndLeave(true)}
      onMouseLeave={() => onMouseEnterAndLeave(false)}
    >
            <div className={styles.carouselContainer}>

      <div className={styles.carouselTitle}>
        <h3>
          <Link
            to={`/category/${query}`}
            state={{ title }}
            style={{ color: "inherit" }}
          >
            {title}
          </Link>
        </h3>
        <Link
          to={`/category/${query}`}
          state={{ title }}
          style={{ color: "inherit" }}
        >
          Показать все
        </Link>
      </div>
        <div className={styles.carousel} ref={sliderRef}>
          <MoviesList movies={movies} type="row" isLoading={isLoading} />
        </div>
      </div>
      <ArrowButton side={"left"} onClick={scrollLeft} isFocused={isFocused} />
      <ArrowButton side={"right"} onClick={scrollRight} isFocused={isFocused} />
    </div>
  );
};

export default Carousel;
