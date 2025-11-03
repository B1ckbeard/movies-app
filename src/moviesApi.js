const BASE_URL = import.meta.env.VITE_MOVIES_BASE_API_URL;
const API_KEY = import.meta.env.VITE_MOVIES_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": API_KEY,
  },
};

export const getAllMovies = async (page_number = 1, page_size = 10) => {
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

export const getMoviesByFilters = async (
  filters = {},
  page_number = 1,
  page_size = 10
) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value.slug || value);
    }
  });

  console.log("params: ", params);

  try {
    const url = `${BASE_URL}/movie?page=${page_number}&limit=${page_size}&${params}`;
    console.log("url: ", url);
    const response = await fetch(url, options);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getMoviesList = async (page_number = 1, page_size = 30) => {
  try {
    const response = await fetch(
      `${BASE_URL}/list?page=${page_number}&limit=${page_size}`,
      options
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getMovieById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}`, options);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPopularSerials = async (page_number = 1, page_size = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie?page=${page_number}&limit=${page_size}&lists=popular-series`,
      options
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getPopularMovies = async (page_number = 1, page_size = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie?page=${page_number}&limit=${page_size}&lists=popular-films`,
      options
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getMoviesByCategory = async (
  page_number = 1,
  page_size = 10,
  category
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie?page=${page_number}&limit=${page_size}&lists=${category}`,
      options
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

// slug: "popular-series", category: "Сериалы",
// slug: "series-top250"
// slug: "popular-films", category: "Фильмы",
// slug: "top500", category: "Фильмы"
// slug: "top250", category: "Фильмы"

// `${BASE_URL}/movie?page=1&limit=10&lists=top250`,
// `${BASE_URL}/movie?page=1&limit=10&lists=popular-films`,

// const getRandomMovie = () => {
//   fetch(`${BASE_URL}/movie/random`, options)
//     .then((res) => res.json())
//     .then((res) => getMovieById(res.id))
//     .catch((err) => console.error(err));
// };
