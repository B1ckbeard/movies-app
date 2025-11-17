import { formatDuration } from "@/shared/helpers/formatDuration";
import { formatPersons } from "@/shared/helpers/formatPersons";
import { formatRatings } from "@/shared/helpers/formatRatings";
import withSkeleton from "@/shared/hocs/withSkeleton";
import styles from "./styles.module.css";
import { Movie } from "@/shared/interfaces";
import MoviesList from "@/widgets/movie/ui/MoviesList/MoviesList";
import Poster from "@/shared/ui/Poster/Poster";

interface Props {
  movie: Movie;
}

const MovieDetails = ({ movie }: Props) => {
  const { actors, directors } = formatPersons(movie.persons || []);
  return (
    <div className={styles.details}>
      <Poster movie={movie} size="lg" />
      <div className={styles.info}>
        <h1 className={styles.itemTitle}>
          {movie.name ? movie.name : movie.alternativeName}
        </h1>
        <p className={styles.rating}>
          Рейтинг: {formatRatings({ rating: movie.rating, type: "long" })}
        </p>
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
        <div className={styles.persons}>
          {directors.length > 0 && (
            <p className={styles.person}>
              Режиссер: {directors.map((director) => director.name).join(", ")}
            </p>
          )}
          {actors.length > 0 && (
            <p className={styles.person}>
              В ролях: {actors.map((actor) => actor.name).join(", ")}
            </p>
          )}
        </div>

        {movie.similarMovies && movie.similarMovies?.length > 0 && (
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
