import { useEffect, useState } from "react";
import "./App.css";

const BASE_URL = import.meta.env.VITE_MOVIES_BASE_API_URL;
const API_KEY = import.meta.env.VITE_MOVIES_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": API_KEY,
  },
};

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  const getMovies = () => {
    fetch(`${BASE_URL}/movie?page=10&limit=10`, options)
      .then((res) => res.json())
      .then((res) => setMovies(res.docs))
      .catch((err) => console.error(err));
  };

  // eslint-disable-next-line no-unused-vars
  const getRandomMovie = () => {
    fetch(`${BASE_URL}/movie/random`, options)
      .then((res) => res.json())
      .then((res) => getMovieById(res.id))
      .catch((err) => console.error(err));
  };

  const getMovieById = (id) => {
    fetch(`${BASE_URL}/movie/${id}`, options)
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h1>Vite + React</h1>
      <button onClick={getMovies}>Get film</button>
      {movies && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h2>{movie.name ? movie.name : movie.alternativeName}</h2>
              <p>Id: {movie.id}</p>
              <img
                src={movie.poster ? movie.poster.previewUrl : null}
                alt="movie_poster"
              />
              <p>{movie.description}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
