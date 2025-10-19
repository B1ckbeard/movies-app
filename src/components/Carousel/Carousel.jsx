import { useRef } from "react";
import styles from "./styles.module.css";
import MoviesList from "../MoviesList/MoviesList";

const Carousel = ({ movies, title, isLoading }) => {
  const sliderRef = useRef(null);
  const step = 420;

  const scrollLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -step, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: step, behavior: "smooth" });
  };

  return (
    <div className={styles.carouselSection}>
      <h3 className={styles.carouselTitle}>{title}</h3>
      <div className={styles.carouselContainer}>
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={scrollLeft}
        >
          {"<"}
        </button>
        <div className={styles.carousel} ref={sliderRef}>
          <MoviesList movies={movies} type="item" isLoading={isLoading} />
        </div>
        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={scrollRight}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
