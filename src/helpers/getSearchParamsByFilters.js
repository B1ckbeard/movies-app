export const getSearchParamsByFilters = (filters) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value.slug || value);
    }
  });
  return params;
};
