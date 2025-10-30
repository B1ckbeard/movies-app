import styles from "./styles.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.info}>
        <h1 className={styles.title}>YeaMovie</h1>
      </div>
      <ul className={styles.list}>
        <li>Главная</li>
        <li>Популярные фильмы</li>
        <li>Популярные сериалы</li>
      </ul>
    </footer>
  );
};

export default Footer;
