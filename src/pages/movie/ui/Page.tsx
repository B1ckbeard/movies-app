import { MovieDetails } from "@/entities/movie";
import { useGetMovieByIdQuery } from "@/entities/movie/api/moviesApi";
import ButtonBack from "@/shared/ui/ButtonBack/ButtonBack";
import ErrorMessage from "@/shared/ui/ErrorMessage/ErrorMessage";
import { useParams } from "react-router";

const MoviePage = () => {
  const params = useParams();
  const movieId = params.id || "";
  const { data, error, isLoading } = useGetMovieByIdQuery(movieId);

  return (
    <>
      <ButtonBack />
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <MovieDetails movie={data} isLoading={isLoading} />
      )}
    </>
  );
};

export default MoviePage;
