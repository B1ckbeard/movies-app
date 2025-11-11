import styles from "./styles.module.css";

const ErrorMessage = ({ error }) => {
  return (
    <h1 className={styles.errorTitle}>
      {error?.data?.userMessage || error?.data?.message || "Произошла ошибка"}
    </h1>
  );
};

export default ErrorMessage;
