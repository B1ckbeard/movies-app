import MoviePoster from "../MoviePoster/MoviePoster";
import styles from "./styles.module.css";

const MovieCard = ({ movie }) => {
  return (
    <li className={styles.card}>
      <MoviePoster movie={movie} />
      <h3 className={styles.title}>
        {movie.name ? movie.name : movie.alternativeName}
      </h3>
      <div className={styles.otherInfo}>
        <p className={styles.year}>{movie.year}г.</p>
        <p className={styles.rating}>{movie.rating.imdb}/10</p>
      </div>
    </li>
  );
};

export default MovieCard;
