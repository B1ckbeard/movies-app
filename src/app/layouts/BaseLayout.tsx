import { Header } from "@/widgets/header";
import styles from "./styles.module.css";
import { Outlet } from "react-router";
import { Footer } from "@/widgets/footer";

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
