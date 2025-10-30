import styles from "./styles.module.css";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleGoHome = () => navigate("/");
  return (
    <div className={styles.notFoundPage}>
      <h2 className={styles.title}>Такой страницы не существует</h2>
      <button className={styles.button} onClick={handleGoHome}>
        Вернуться
      </button>
    </div>
  );
};

export default NotFoundPage;
