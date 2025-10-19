import styles from "./styles.module.css";

const Skeleton = ({ count = 1 }) => {
  return (
    <>
      {count > 1 ? (
        <ul className={styles.rowList}>
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
