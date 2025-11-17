import styles from "./styles.module.css";

interface Props {
  direction?: "row" | "column" | "grid";
  count?: number;
}

const Skeleton = ({ direction = "row", count = 1 }: Props) => {
  return (
    <>
      {count > 1 ? (
        <ul
          className={
            direction === "row"
              ? styles.rowList
              : direction === "grid"
              ? styles.grid
              : styles.columnList
          }
        >
          {[...Array(count)].map((_, index) => (
            <li key={index} className={styles.card}></li>
          ))}
        </ul>
      ) : (
        <div className={styles.item}></div>
      )}
    </>
  );
};

export default Skeleton;
