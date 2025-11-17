import { FiltersState } from "@/entities/movie/model/moviesSlice";

type FilterRecord = FiltersState;

export const getSearchParamsByFilters = (
  filters: FilterRecord
): URLSearchParams => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      const stringValue =
        typeof value === "string" ? value : value.slug || String(value);
      params.append(key, stringValue);
    }
  });

  return params;
};
 