import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Pagination from "./components/Pagination/Pagination";
import { getMovies } from "./moviesApi";
import Carousel from "./components/Carousel/Carousel";

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchMovies = async (currentPage) => {
    try {
      const response = await getMovies(currentPage, pageSize);
      setMovies(response);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <div className="container">
        {movies && (
          <>
            <h3>Popular movies</h3>
            <Carousel movies={movies.docs} />
          </>
        )}
        {movies && (
          <>
            <h3>Popular serials</h3>
            <Carousel movies={movies.docs} />
          </>
        )}
        {movies.pages && (
          <Pagination
            currentPage={currentPage}
            pagesCount={movies.pages - 1}
            paginationSize={5}
            handlePageClick={handlePageClick}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
