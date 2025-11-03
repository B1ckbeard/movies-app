import styles from "./styles.module.css";
import { posters } from "../../assets";
import { Link } from "react-router";

const MovieCard = ({ movie, type = "row" }) => {
  const formatRatings = (rating) => {
    const ratingParts = [];
    if (rating.imdb > 0) ratingParts.push(`IMDb: ${rating.imdb.toFixed(1)}/10`);
    if (rating.kp > 0)
      ratingParts.push(`КиноПоиск: ${rating.kp.toFixed(1)}/10`);

    return ratingParts.length > 0 ? ratingParts.join(" | ") : "нет оценок";
  };

  const formatDuration = (length) => {
    if (!length || length === 0) return null;

    const hours = Math.trunc(length / 60);
    const minutes = length % 60;

    return `${hours > 0 ? hours + " ч." : ""} ${
      minutes > 0 ? minutes + " мин." : ""
    }`;
  };

  // console.log(movie);
  return (
    <li
      className={`${styles.card} ${
        type === "row" ? styles.item : styles.banner
      }`}
    >
      <Link to={`/movie/${movie.id}`}>
        <img
          className={styles.poster}
          src={
            movie.poster?.previewUrl ? movie.poster.previewUrl : posters.poster2
          }
          loading="lazy"
          alt={movie.name}
        />
      </Link>

      {type !== "row" && (
        <div className={styles.info}>
          <h3 className={styles.title}>
            <Link to={`/movie/${movie.id}`} style={{ color: "inherit" }}>
              {movie.name ? movie.name : movie.alternativeName}
            </Link>
          </h3>
          <p className={styles.rating}>
            Рейтинг: {formatRatings(movie.rating)}
          </p>
          <p>{movie.description}</p>
          <p className={styles.genres}>
            Жанр: {movie.genres?.map((genre) => genre.name).join(", ")}
          </p>
          <p className={styles.country}>
            Страна: {movie.countries?.map((country) => country.name).join(", ")}
          </p>
          <p>Год: {movie.year}</p>
          {movie.movieLength && (
            <p>Продолжительность: {formatDuration(movie.movieLength)}</p>
          )}
        </div>
      )}

      {type === "row" && (
        <div className={styles.itemInfo}>
          <h4 className={styles.title}>
            <Link to={`/movie/${movie.id}`} style={{ color: "inherit" }}>
              {movie.name ? movie.name : movie.alternativeName}
            </Link>
          </h4>
          <div className={styles.otherInfo}>
            <p className={styles.year}>{movie.year}г.</p>
            <p className={styles.rating}>
              {movie.rating.kp > 0
                ? movie.rating.kp.toFixed(1)
                : movie.rating.imdb > 0
                ? movie.rating.imdb
                : ""}
            </p>
          </div>
        </div>
      )}
    </li>
  );
};

export default MovieCard;
