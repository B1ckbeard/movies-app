import styles from "./styles.module.css";
import _ from "lodash";

const Pagination = ({
  currentPage,
  pagesCount = 10,
  paginationSize = 5,
  handlePageClick,
}) => {
  const startPage = 1;

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

  const pages = getPagesRange();

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
      {pages.map((page) => (
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

export default Pagination;
