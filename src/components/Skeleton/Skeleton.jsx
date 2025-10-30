import styles from "./styles.module.css";

const Skeleton = ({ type = 'row', count = 1 }) => {
  return (
    <>
      {count > 1 ? (
        <ul className={`${type === 'row' ? styles.rowList : styles.columnList}`}>
          {[...Array(count)].map((_, index) => (
            <li key={index} className={styles.item}></li>
          ))}
        </ul>
      ) : (
        <li className={styles.item}></li>
      )}
    </>
  );
};

export default Skeleton;
