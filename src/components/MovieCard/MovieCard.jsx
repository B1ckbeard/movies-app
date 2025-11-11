import styles from "./styles.module.css";
import { Link } from "react-router";
import { formatRatings } from "../../helpers/formatRatings";
import { formatDuration } from "../../helpers/formatDuration";
import MoviePoster from "../MoviePoster/MoviePoster";

const MovieCard = ({ movie, type = "banner" }) => {
  return (
    <li
      className={`${styles.card} ${
        type === "banner" ? styles.banner : styles.item
      }`}
    >
      <MoviePoster movie={movie} />
      {type === "item" && (
        <div className={`${styles.info} ${styles.itemInfo}`}>
          <h3 className={styles.itemTitle}>
            <Link to={`/movie/${movie.id}`} style={{ color: "inherit" }}>
              {movie.name ? movie.name : movie.alternativeName}
            </Link>
          </h3>
          <p className={styles.rating}>
            Рейтинг: {formatRatings(movie.rating)}
          </p>
          <p className={styles.description}>{movie.description}</p>
          <p className={styles.genres}>
            Жанр: {movie.genres?.map((genre) => genre.name).join(", ")}
          </p>
          <p className={styles.country}>
            Страна: {movie.countries?.map((country) => country.name).join(", ")}
          </p>
          <p className={styles.year}>Год: {movie.year}</p>
          {movie.movieLength > 0 && (
            <p className={styles.length}>
              Длительность: {formatDuration(movie.movieLength)}
            </p>
          )}
        </div>
      )}

      {type === "banner" && (
        <div className={`${styles.info} ${styles.bannerInfo}`}>
          <h5 className={styles.title}>
            <Link to={`/movie/${movie.id}`} style={{ color: "inherit" }}>
              {movie.name ? movie.name : movie.alternativeName}
            </Link>
          </h5>
          <div className={styles.otherInfo}>
            {movie.year && <p className={styles.year}>{movie.year}г.</p>}
            <p className={styles.rating}>
              {formatRatings(movie.rating, (type = "short"))}
            </p>
          </div>
        </div>
      )}
    </li>
  );
};

export default MovieCard;
