import styles from "./styles.module.css";

const ArrowButton = ({ side, onClick, isFocused = true }) => {
  return (
    <button
      className={`${styles.arrow} ${
        side === "left" ? styles.arrowLeft : styles.arrowRight
      } ${isFocused ? styles.visible : styles.hidden}`}
      onClick={onClick}
    >
      {side === "left" ? "<" : ">"}
    </button>
  );
};

export default ArrowButton;
