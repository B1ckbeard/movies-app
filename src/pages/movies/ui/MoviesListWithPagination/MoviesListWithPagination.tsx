import { Movie } from "@/shared/interfaces";
import { Pagination } from "@/features/pagination";
import { MoviesList } from "@/widgets/movie";

interface Props {
  movies: Movie[];
  isLoading?: boolean;
}

const MoviesListWithPagination = ({ movies, isLoading }: Props) => {
  return (
    <Pagination top bottom>
      <MoviesList
        movies={movies}
        direction="column"
        type="item"
        isLoading={isLoading}
      />
    </Pagination>
  );
};

export default MoviesListWithPagination;
