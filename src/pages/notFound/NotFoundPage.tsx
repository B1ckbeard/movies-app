import styles from "./styles.module.css";
import ButtonBack from "@/ui/ButtonBack/ButtonBack";

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <h1 className={styles.title}>Такой страницы не существует</h1>
      <ButtonBack />
    </div>
  );
};

export default NotFoundPage;
