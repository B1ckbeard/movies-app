import styles from "./styles.module.css";
import { Outlet } from "react-router";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

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
