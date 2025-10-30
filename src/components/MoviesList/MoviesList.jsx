import { Link } from "react-router";
import withSkeleton from "../../hocs/withSkeleton";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./styles.module.css";

const MoviesList = ({ movies, type = "row" }) => {
  return (
    <ul
      className={`${styles.list} ${
        type === "row" ? styles.rowList : styles.columnList
      }`}
    >
      {movies?.map((movie) => (
        <MovieCard movie={movie} type={type} key={movie.id} />
      ))}
    </ul>
  );
};

const MoviesListWithSkeleton = withSkeleton(MoviesList, 10);

export default MoviesListWithSkeleton;
