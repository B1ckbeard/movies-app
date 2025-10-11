import { useEffect, useState } from "react";
import MoviesList from "./components/MoviesList/MoviesList";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Pagination from "./components/Pagination/Pagination";
import { getMovies } from "./moviesApi";

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchMovies = async (currentPage) => {
    try {
      const response = await getMovies(currentPage, pageSize);
      setMovies(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
    console.log(currentPage);
  }, [currentPage]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      {movies && <MoviesList movies={movies.docs} />}
      {movies.pages && (
        <Pagination
          currentPage={currentPage}
          pagesCount={movies.pages - 1}
          paginationSize={5}
          handlePageClick={handlePageClick}
        />
      )}
      <Footer />
    </>
  );
}

export default App;
