import _ from "lodash";
import { Country, Genre } from "@/shared/interfaces";
import { countriesList } from "../countriesList";
import { genresList } from "../genresList";
import { useAppSelector, useAppDispatch, RootState } from "@/app/appStore";
import {
  setFilters,
  resetFilters,
  FiltersState,
} from "@/entities/movie/model/moviesSlice";

type FilterKey = "genres.name" | "countries.name" | "year" | "rating.kp";

interface FilterConfig {
  key: string;
  name: string;
  optionList: number[] | Genre[] | Country[];
}

interface UseFiltersReturn {
  getApiFilters: () => Record<string, any>;
  handleResetFilters: () => void;
  filterConfigs: FilterConfig[];
  getFilterProps: (key: string) => {
    optionList: any[];
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
  };
}

const useFilters = (): UseFiltersReturn => {
  const filters = useAppSelector((state: RootState) => state.movies.filters);
  const dispatch = useAppDispatch();

  const updateFilters = (
    key: keyof RootState["movies"]["filters"],
    value: string
  ): void => {
    dispatch(setFilters({ key, value }));
  };

  const handleResetFilters = (): void => {
    dispatch(resetFilters());
  };

  const getApiFilters = (): FiltersState => {
    const apiFilters = { ...filters };
    if (apiFilters["rating.kp"]) {
      apiFilters["rating.kp"] = `${apiFilters["rating.kp"]}-10`;
    }
    return apiFilters;
  };

  const yearRange = _.range(2025, 1874);
  const ratingRange = _.range(9, 0);

  const filterConfigs: FilterConfig[] = [
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

  const getFilterProps = (key: string) => {
    const filterKey = key as FilterKey;
    const config = filterConfigs.find((cfg) => cfg.key === filterKey);
    if (!config) {
      throw new Error(`Filter config not found for key: ${key}`);
    }
    return {
      optionList: config.optionList,
      placeholder: config.name,
      value: filters[filterKey] || "",
      onChange: (value: string) => updateFilters(filterKey, value),
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
