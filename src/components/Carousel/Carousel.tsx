import { useRef, useState } from "react";
import styles from "./styles.module.css";
import MoviesList from "../MoviesList/MoviesList";
import { Link } from "react-router";
import ArrowButton from "../../ui/ArrowButton/ArrowButton";
import { Movie } from "@/interfaces";

interface Props {
  movies: Movie[];
  title?: string;
  query?: string;
  isLoading: boolean;
  direction?: "grid" | "row" | "column";
}

const Carousel = ({
  movies,
  title = "",
  query = "",
  isLoading = false,
  direction = "grid",
}: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const step = 420;

  const scrollLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -step, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: step, behavior: "smooth" });
  };

  const onMouseEnterAndLeave = (value: boolean) => {
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
          <p className={`${styles.carouselTitle}`}>
            <Link
              to={`${query}`}
              state={{ title }}
              style={{ color: "inherit" }}
            >
              {"Показать все >"}
            </Link>
          </p>
          <div className={styles.carousel} ref={sliderRef}>
            <MoviesList
              movies={movies}
              direction={direction}
              type="banner"
              isLoading={isLoading}
            />
          </div>
          {!isLoading && (
            <>
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
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Carousel;
