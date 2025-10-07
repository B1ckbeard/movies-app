import { posters } from "../../assets";
import styles from "./styles.module.css";

const MoviePoster = ({ movie }) => {
  return (
    <img
      className={styles.poster}
      src={
        movie.poster && movie.poster.previewUrl
          ? movie.poster.previewUrl
          : posters.poster3
      }
      alt="movie_poster"
    />
  );
};
export default MoviePoster;
