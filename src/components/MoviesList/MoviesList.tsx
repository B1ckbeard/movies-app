import { useDeferredValue } from "react";
import styles from "./styles.module.css";
import withSkeleton from "@/hocs/withSkeleton";
import MovieCard from "../MovieCard/MovieCard";
import { Movie } from "@/interfaces";

interface Props {
  movies: Movie[];
  direction?: "row" | "column" | "grid";
  type: "banner" | "item";
}

const MoviesList = ({ movies, direction = "row", type }: Props) => {
  const list = useDeferredValue(movies);
  return (
    <ul
      className={`${styles.list} ${
        direction === "row"
          ? styles.rowList
          : direction === "grid"
          ? styles.grid
          : styles.columnList
      }`}
    >
      {list?.map((movie) => (
        <MovieCard movie={movie} type={type} key={movie.id} />
      ))}
    </ul>
  );
};

const MoviesListWithSkeleton = withSkeleton(MoviesList, 12);

export default MoviesListWithSkeleton;
