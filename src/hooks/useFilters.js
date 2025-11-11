import _ from "lodash";
import { genresList } from "../genresList";
import { countriesList } from "../countriesList";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters, setFilters } from "../store/moviesSlice";
import { useLazyGetMoviesByFiltersQuery } from "../api/moviesApi";

const useFilters = () => {
  const filters = useSelector((state) => state.movies.filters);
  const dispatch = useDispatch();

  const [fetchMovies, { data, isLoading, error }] =
    useLazyGetMoviesByFiltersQuery();

  const fetchMoviesByFilters = () => {
    const apiFilters = { ...filters };
    if (apiFilters["rating.kp"]) {
      apiFilters["rating.kp"] = `${apiFilters["rating.kp"]}-10`;
    }
    return fetchMovies({
      page_number: 1,
      page_size: 30,
      filters: apiFilters,
    });
  };

  const updateFilters = (key, value) => {
    dispatch(setFilters({ key, value }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const yearRange = _.range(2025, 1874);
  const ratingRange = _.range(9, 0);

  const filterConfigs = [
    {
      key: "genres.name",
      name: "Жанр",
      optionList: genresList,
    },
    {
      key: "countries.name",
      name: "Страна",
      optionList: countriesList,
    },
    {
      key: "year",
      name: "Год",
      optionList: yearRange,
    },
    {
      key: "rating.kp",
      name: "Рейтинг, от",
      optionList: ratingRange,
    },
  ];

  const getFilterProps = (key) => {
    const config = filterConfigs.find((cfg) => cfg.key === key);
    return {
      optionList: config.optionList,
      placeholder: config.name,
      value: filters[key],
      onChange: (value) => updateFilters(key, value),
    };
  };

  return {
    movies: data?.docs || [],
    isLoading,
    error,
    handleResetFilters,
    filterConfigs,
    getFilterProps,
    fetchMoviesByFilters,
  };
};

export default useFilters;
