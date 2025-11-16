import styles from "./styles.module.css";
import { Link } from "react-router";
import Search from "../../ui/Search/Search";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link to="/">YeaMovie</Link>
      </h1>
      <Search />
    </header>
  );
};

export default Header;
