const BASE_URL = import.meta.env.VITE_MOVIES_BASE_API_URL;
const API_KEY = import.meta.env.VITE_MOVIES_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": API_KEY,
  },
};

export const getMovies = async (page_number = 1, page_size = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie?page=${page_number}&limit=${page_size}`,
      options
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

// const getRandomMovie = () => {
//   fetch(`${BASE_URL}/movie/random`, options)
//     .then((res) => res.json())
//     .then((res) => getMovieById(res.id))
//     .catch((err) => console.error(err));
// };

// const getMovieById = (id) => {
//   fetch(`${BASE_URL}/movie/${id}`, options)
//     .then((res) => res.json())
//     .then((res) => console.log(res))
//     .catch((err) => console.error(err));
// };
