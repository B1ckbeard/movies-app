import { usePagination } from "../../hooks/usePagination";
import styles from "./styles.module.css";

const PaginationButtons = () => {
  const {
    currentPage,
    pagesCount,
    pagesRange,
    handlePageClick,
    handlePrevPage,
    handleNextPage,
  } = usePagination();
  const startPage = 1;
  return (
    <ul className={styles.pagination}>
      <li>
        <button
          onClick={() => handlePageClick(startPage)}
          disabled={currentPage === startPage}
          className={`${styles.button} ${styles.firstPageButton}`}
        >
          {"<<"}
        </button>
      </li>
      <li>
        <button
          className={styles.button}
          onClick={handlePrevPage}
          disabled={currentPage === startPage}
        >
          {"<"}
        </button>
      </li>
      {pagesRange.map((page) => (
        <li key={page}>
          <button
            onClick={() => handlePageClick(page)}
            className={`${styles.button} ${
              currentPage === page ? styles.active : ""
            }`}
          >
            {page}
          </button>
        </li>
      ))}
      <li>
        <button
          className={styles.button}
          onClick={handleNextPage}
          disabled={currentPage === pagesCount}
        >
          {">"}
        </button>
      </li>
      <li>
        <button
          onClick={() => handlePageClick(pagesCount)}
          disabled={currentPage === pagesCount}
          className={`${styles.button} ${styles.lastPageButton}`}
        >
          {">>"}
        </button>
      </li>
    </ul>
  );
};

export default PaginationButtons;
