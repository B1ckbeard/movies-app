import styles from "./styles.module.css";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.info}>
        <Link to="/">
          <h1 className={styles.title}>YeaMovie</h1>
        </Link>
      </div>
      <input type="text" />
    </header>
  );
};

export default Header;
