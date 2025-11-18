import { useAppSelector } from "@/app/appStore";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

export const useScrollToTop = (): void => {
  const { currentPage } = useAppSelector((state) => state.movies.pages);
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname, currentPage]);
};
