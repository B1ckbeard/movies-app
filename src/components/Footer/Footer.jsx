import { Link } from "react-router";
import styles from "./styles.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h1 className={styles.title}>
        <Link to="/">YeaMovie</Link>
      </h1>
      <ul className={styles.list}>
        <li>
          <Link
            to={"/category/popular-films"}
            state={{ title: "Популярные фильмы" }}
            style={{ color: "inherit" }}
          >
            Популярные фильмы
          </Link>
        </li>
        <li>
          <Link
            to={"/category/popular-series"}
            state={{ title: "Популярные сериалы" }}
            style={{ color: "inherit" }}
          >
            Популярные сериалы
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
