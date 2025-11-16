import { useGetMovieByIdQuery } from "@/api/moviesApi";
import MovieDetails from "@/components/MovieDetails/MovieDetails";
import ButtonBack from "@/ui/ButtonBack/ButtonBack";
import ErrorMessage from "@/ui/ErrorMessage/ErrorMessage";
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
