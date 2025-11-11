import MoviesList from "../MoviesList/MoviesList";
import Pagination from "../Pagination/Pagination";

const MoviesListWithPagination = ({ movies, isLoading }) => {
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
