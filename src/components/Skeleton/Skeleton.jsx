import styles from "./styles.module.css";

const Skeleton = ({ type = 'row', count = 1 }) => {
  return (
    <>
      {count > 1 ? (
        <ul className={`${type === 'row' ? styles.gridList : styles.columnList}`}>
          {[...Array(count)].map((_, index) => (
            <li key={index} className={styles.card}>
              <div className={styles.poster}></div>
              <div className={styles.title}></div>
              <div className={styles.info}>
                <div className={styles.year}></div>
                <div className={styles.rating}></div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.item}></div>
      )}
    </>
  );
};

export default Skeleton;
