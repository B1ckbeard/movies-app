import styles from "./styles.module.css";
import withSkeleton from "../../hocs/withSkeleton";
import { formatRatings } from "../../helpers/formatRatings";
import { formatDuration } from "../../helpers/formatDuration";
import { formatPersons } from "../../helpers/formatPersons";
import MoviesList from "../MoviesList/MoviesList";
import MoviePoster from "../MoviePoster/MoviePoster";

const MovieDetails = ({ movie }) => {
  const { actors, directors } = formatPersons(movie);
  return (
    <div className={styles.details}>
      <MoviePoster movie={movie} size="lg"/>
      <div className={styles.info}>
        <h1 className={styles.itemTitle}>
          {movie.name ? movie.name : movie.alternativeName}
        </h1>
        <p className={styles.rating}>Рейтинг: {formatRatings(movie.rating)}</p>

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
        {movie.persons?.length > 0 && (
          <div className={styles.persons}>
            <p className={styles.person}>
              Режиссер: {directors.map((director) => director.name).join(", ")}
            </p>
            <p className={styles.person}>
              В ролях: {actors.map((actor) => actor.name).join(", ")}
            </p>
          </div>
        )}
        {movie.similarMovies?.length > 0 && (
          <div className={styles.similar}>
            <h3 className={styles.similarTitle}>Похожие фильмы</h3>
            <MoviesList
              movies={movie.similarMovies}
              direction="row"
              type="banner"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const MovieDetailsWithSkeleton = withSkeleton(MovieDetails, 1);

export default MovieDetailsWithSkeleton;
