import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router";
import { Movie } from "@/shared/interfaces";
import MoviesList from "../MoviesList/MoviesList";
import ArrowButton from "@/shared/ui/ArrowButton/ArrowButton";

interface Props {
  movies: Movie[];
  title?: string;
  query?: string;
  isLoading: boolean;
  direction?: "grid" | "row" | "column";
}

const MoviesCarousel = ({
  movies,
  title = "",
  query = "",
  isLoading = false,
  direction = "grid",
}: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const step = 420;

  const checkScrollPosition = useCallback(() => {
    if (!sliderRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  const scrollLeft = () => {
    if (!sliderRef.current || !canScrollLeft) return;
    sliderRef.current.scrollBy({ left: -step, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!sliderRef.current || !canScrollRight) return;
    sliderRef.current.scrollBy({ left: step, behavior: "smooth" });
  };

  const onMouseEnterAndLeave = (value: boolean) => {
    setIsFocused(value);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const resizeObserver = new ResizeObserver(() => {
      checkScrollPosition();
    });

    resizeObserver.observe(slider);

    return () => {
      resizeObserver.unobserve(slider);
    };
  }, [checkScrollPosition]);

  useEffect(() => {
    checkScrollPosition();
  }, [movies, checkScrollPosition]);

  const handleScroll = () => {
    requestAnimationFrame(checkScrollPosition);
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
          <div
            className={styles.carousel}
            ref={sliderRef}
            onScroll={handleScroll}
          >
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
                disabled={!canScrollLeft}
              />
              <ArrowButton
                side={"right"}
                onClick={scrollRight}
                isFocused={isFocused}
                disabled={!canScrollRight}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MoviesCarousel;
