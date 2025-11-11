import styles from "./styles.module.css";
import { Link } from "react-router";

const MoviePoster = ({ movie, size = "sm" }) => {
  const posterContent = movie.poster?.previewUrl ? (
    <img
      className={`${styles.poster} ${styles.posterImage} ${
        size === "sm" ? styles.small : styles.large
      }`}
      src={movie.poster.previewUrl}
      loading="lazy"
      alt={movie.name}
    />
  ) : (
    <div
      className={`${styles.poster} ${styles.noPoster} ${
        size === "sm" ? styles.small : styles.noPosterLarge
      }`}
    >
      <p className={styles.noPosterDescription}>Постер не доступен</p>
    </div>
  );

  if (size === "lg") {
    return posterContent;
  }

  return <Link to={`/movie/${movie.id}`}>{posterContent}</Link>;
};

export default MoviePoster;
