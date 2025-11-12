import _ from "lodash";
import { genresList } from "../genresList";
import { countriesList } from "../countriesList";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters, setFilters } from "../store/moviesSlice";

const useFilters = () => {
  const filters = useSelector((state) => state.movies.filters);
  const dispatch = useDispatch();

  const updateFilters = (key, value) => {
    dispatch(setFilters({ key, value }));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const getApiFilters = () => {
    const apiFilters = { ...filters };
    if (apiFilters["rating.kp"]) {
      apiFilters["rating.kp"] = `${apiFilters["rating.kp"]}-10`;
    }
    return apiFilters;
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
    getApiFilters,
    handleResetFilters,
    filterConfigs,
    getFilterProps,
  };
};

export default useFilters;
