import styles from "./styles.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.info}>
        <h1 className={styles.title}>Movies app</h1>
      </div>
      <input type="text" />
    </header>
  );
};

export default Header;
