import { Routes, Route } from "react-router";
import BaseLayout from "./layouts/BaseLayout";
import MainPage from "./pages/main/MainPage";
import MoviePage from "./pages/movie/MoviePage";
import MoviesPage from "./pages/movies/MoviesPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<MainPage />} />
        <Route path="category/:category" element={<MoviesPage />} />
        <Route path="search" element={<MoviesPage />} />
        <Route path="movie/:id" element={<MoviePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
