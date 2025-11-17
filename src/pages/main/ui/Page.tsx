import MoviesByFilters from "./MoviesByFilters/MoviesByFilters";
import MoviesInCinemaSlider from "./MoviesInCinemaSlider/MoviesInCinemaSlider";
import PopularMovies from "./PopularMovies/PopularMovies";

const MainPage = () => {
  return (
    <>
      <MoviesInCinemaSlider />
      <PopularMovies />
      <MoviesByFilters />
    </>
  );
};

export default MainPage;
