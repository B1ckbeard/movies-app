import { useAppSelector } from "@/app/appStore";
import { useLayoutEffect } from "react";

export const useScrollToTop = (): void => {
  const { currentPage } = useAppSelector((state) => state.movies.pages);

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);
};
