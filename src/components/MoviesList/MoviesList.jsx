import withSkeleton from "../../hocs/withSkeleton";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./styles.module.css";

const MoviesList = ({ movies, type = "item" }) => {
  return (
    <ul className={`${type === "item" ? styles.items : styles.banners}`}>
      {movies?.map((movie) => (
        <MovieCard movie={movie} type={type} key={movie.id} />
      ))}
    </ul>
  );
};

const MoviesListWithSkeleton = withSkeleton(MoviesList, 10);

export default MoviesListWithSkeleton;
