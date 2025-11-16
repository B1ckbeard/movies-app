import { Link } from "react-router";
import styles from "./styles.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/" className={styles.logo}>
        YeaMovie
      </Link>
      <nav className={styles.navSection}>
        <ul className={styles.navList}>
          <li>
            <Link to={"/"} className={styles.navLink}>
              Главная
            </Link>
          </li>
          <li>
            <Link
              to={"/category/popular-films"}
              state={{ title: "Популярные фильмы" }}
              className={styles.navLink}
            >
              Популярные фильмы
            </Link>
          </li>
          <li>
            <Link
              to={"/category/popular-series"}
              state={{ title: "Популярные сериалы" }}
              className={styles.navLink}
            >
              Популярные сериалы
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
