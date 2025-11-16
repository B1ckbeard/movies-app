import PaginationButtons from "../PaginationButtons/PaginationButtons";

interface Props {
  top?: boolean;
  bottom?: boolean;
  children: React.ReactNode;
}

const Pagination = ({ top, bottom, children }: Props) => {
  return (
    <>
      {top && <PaginationButtons />}
      {children}
      {bottom && <PaginationButtons />}
    </>
  );
};

export default Pagination;
