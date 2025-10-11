import MovieCard from "../MovieCard/MovieCard";
import styles from "./styles.module.css";

const MoviesList = ({ movies }) => {
  return (
    <section className={styles.section}>
      <ul className={styles.items}>
        {movies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </ul>
    </section>
  );
};

export default MoviesList;
