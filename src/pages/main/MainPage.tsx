import MoviesByFilters from "@/components/MoviesByFilters/MoviesByFilters";
import PopularMovies from "@/components/PopularMovies/PopularMovies";
import Slider from "@/components/Slider/Slider";

const MainPage = () => {
  return (
    <>
      <Slider />
      <PopularMovies />
      <MoviesByFilters />
    </>
  );
};

export default MainPage;
