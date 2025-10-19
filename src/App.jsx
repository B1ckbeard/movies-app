import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Pagination from "./components/Pagination/Pagination";
import { getMovies } from "./moviesApi";
import Carousel from "./components/Carousel/Carousel";

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const pageSize = 10;

  const fetchMovies = async (currentPage) => {
    try {
      const response = await getMovies(currentPage, pageSize);
      setMovies(response);
      setIsLoading(false)
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true)
    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <div className="container">
        {movies && <Carousel movies={movies.docs} title={"Popular movies"} isLoading={isLoading}/>}
        {movies && <Carousel movies={movies.docs} title={"Popular serials"} isLoading={isLoading}/>}
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
