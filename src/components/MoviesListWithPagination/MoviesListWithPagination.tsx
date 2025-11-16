import { Movie } from "@/interfaces";
import MoviesList from "../MoviesList/MoviesList";
import Pagination from "../Pagination/Pagination";

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
