import styles from "./styles.module.css";
import { Link } from "react-router";
import { Movie } from "@/shared/interfaces";
import { formatDuration } from "@/shared/helpers/formatDuration";
import { formatRatings } from "@/shared/helpers/formatRatings";
import Poster from "@/shared/ui/Poster/Poster";

interface Props {
  movie: Movie;
  type: "banner" | "item";
}

const MovieCard = ({ movie, type }: Props) => {
  return (
    <li
      className={`${styles.card} ${
        type === "banner" ? styles.banner : styles.item
      }`}
    >
      <Poster movie={movie} />
      {type === "item" && (
        <div className={`${styles.info} ${styles.itemInfo}`}>
          <h3 className={styles.itemTitle}>
            <Link to={`/movie/${movie.id}`} style={{ color: "inherit" }}>
              {movie.name ? movie.name : movie.alternativeName}
            </Link>
          </h3>
          {movie.rating && (
            <p className={styles.rating}>
              Рейтинг: {formatRatings({ rating: movie.rating, type: "short" })}
            </p>
          )}
          <p className={styles.description}>{movie.description}</p>
          <p className={styles.genres}>
            Жанр: {movie.genres?.map((genre) => genre.name).join(", ")}
          </p>
          <p className={styles.country}>
            Страна: {movie.countries?.map((country) => country.name).join(", ")}
          </p>
          <p className={styles.year}>Год: {movie.year}</p>
          {movie.movieLength != null && movie.movieLength > 0 && (
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
            {movie.rating && (
              <p className={styles.rating}>
                {formatRatings({ rating: movie.rating, type: "short" })}
              </p>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

export default MovieCard;
