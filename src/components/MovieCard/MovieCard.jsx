import styles from "./styles.module.css";
import { posters } from "../../assets";
import { Link } from "react-router";

const MovieCard = ({ movie, type = "row" }) => {
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
          {movie.rating.imdb !== 0 && (
            <p className={styles.rating}>Рейтинг: {movie.rating.imdb}</p>
          )}
          <p>{movie.description}</p>
          <p className={styles.genres}>
            Жанр: {movie.genres?.map((genre) => genre.name).join(", ")}
          </p>
          <p className={styles.country}>
            Страна: {movie.countries?.map((country) => country.name).join(", ")}
          </p>
          <p>Год: {movie.year}</p>
          {movie.movieLength && (
            <p>
              Продолжительность:
              {` ${Math.trunc(movie.movieLength / 60)} ч. ${
                movie.movieLength % 60
              } мин.`}
            </p>
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
            {movie.rating.imdb !== 0 && (
              <p className={styles.rating}>{movie.rating.imdb}</p>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

export default MovieCard;
