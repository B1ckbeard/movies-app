import { useRef } from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./styles.module.css";

const Carousel = ({ movies }) => {
  const sliderRef = useRef(null);
  const step = 400;

  const scrollLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -step, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: step, behavior: "smooth" });
  };

  return (
    <div className={styles.carouselContainer}>
      <button
        className={`${styles.arrow} ${styles.arrowLeft}`}
        onClick={scrollLeft}
      >
        {"<"}
      </button>
      <div className={styles.carousel} ref={sliderRef}>
        <div className={styles.group}>
          {movies?.map((movie) => (
            <div key={movie.id} className={styles.movieItem}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
      <button
        className={`${styles.arrow} ${styles.arrowRight}`}
        onClick={scrollRight}
      >
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
