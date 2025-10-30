import styles from "./styles.module.css";
import withSkeleton from "../../hocs/withSkeleton";
import { posters } from "../../assets";

const MovieDetails = ({ movie }) => {
  return (
    <div className={styles.details}>
      <img
        className={styles.poster}
        src={
          movie.poster?.previewUrl ? movie.poster.previewUrl : posters.poster2
        }
        alt="movie_poster"
      />
      <div className={styles.info}>
        <h1>{movie.name ? movie.name : movie.alternativeName}</h1>
        <p>{movie.description}</p>
        <p>Год - {movie.year}</p>
        {movie.rating.imdb !== 0 && (
          <p className={styles.rating}>{movie.rating.imdb}</p>
        )}
      </div>
    </div>
  );
};

const MovieDetailsWithSkeleton = withSkeleton(MovieDetails, 1);

export default MovieDetailsWithSkeleton;
