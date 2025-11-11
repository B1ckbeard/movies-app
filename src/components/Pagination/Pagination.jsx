import PaginationButtons from "../PaginationButtons/PaginationButtons";

const Pagination = ({ top, bottom, children }) => {
  return (
    <>
      {top && <PaginationButtons />}
      {children}
      {bottom && <PaginationButtons />}
    </>
  );
};

export default Pagination;
