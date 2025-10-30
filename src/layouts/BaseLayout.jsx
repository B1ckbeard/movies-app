import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styles from "./styles.module.css";
import { Outlet } from "react-router";

function BaseLayout() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default BaseLayout;
