import { useAppDispatch, useAppSelector } from "@/app/appStore";
import { setPages } from "@/entities/movie/model/moviesSlice";
import _ from "lodash";

interface UsePaginationReturn {
  currentPage: number;
  pagesCount: number;
  pagesRange: number[];
  handlePageClick: (pageNumber: number) => void;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

export const usePagination = (): UsePaginationReturn => {
  const dispatch = useAppDispatch();
  const { currentPage, pagesCount } = useAppSelector(
    (state) => state.movies.pages
  );
  const paginationSize = 5;

  const handlePageClick = (pageNumber: number) => {
    dispatch(setPages({ key: "currentPage", value: pageNumber }));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pagesCount) {
      handlePageClick(currentPage + 1);
    }
  };

  const getPagesRange = () => {
    const delta = Math.floor(paginationSize / 2);
    let start = currentPage - delta;
    let end = currentPage + delta;

    if (start < 1) {
      start = 1;
      end = Math.min(pagesCount, paginationSize);
    }

    if (end > pagesCount) {
      end = pagesCount;
      start = Math.max(1, pagesCount - paginationSize + 1);
    }
    const pagesRange = _.range(start, end + 1);

    return pagesRange;
  };

  const pagesRange = getPagesRange();

  return {
    currentPage,
    pagesCount,
    pagesRange,
    handlePageClick,
    handlePrevPage,
    handleNextPage,
  };
};
