import { SerializedError } from "@reduxjs/toolkit";
import styles from "./styles.module.css";

interface ErrorData {
  message?: string;
}

interface CustomError {
  data?: ErrorData;
  status?: number;
}

interface Props {
  error?: CustomError | SerializedError | null;
}

const ErrorMessage = ({ error }: Props) => {
  const errorMessage =
    (error as CustomError)?.data?.message ||
    (error as SerializedError)?.message ||
    "Произошла ошибка";
  return <h1 className={styles.errorTitle}>{errorMessage}</h1>;
};

export default ErrorMessage;
