import { useLocation, useParams } from "react-router";

export const useQueryParams = () => {
  const params = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return {
    category: params.category,
    title: location.state?.title,
    searchQuery: searchParams.get("q"),
    hasFilters: location.pathname.includes("filters"),
    hasSearch: !!searchParams.get("q")?.trim(),
  };
};
