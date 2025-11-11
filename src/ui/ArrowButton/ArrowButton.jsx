import styles from "./styles.module.css";

const ArrowButton = ({
  side,
  offset = 0,
  color = "dark",
  onClick,
  isFocused = true,
}) => {
  return (
    <button
      className={`${styles.arrow} ${
        color === "dark" ? styles.dark : styles.light
      } ${isFocused ? styles.visible : styles.hidden}`}
      style={side === "left" ? { left: offset } : { right: offset }}
      onClick={onClick}
    >
      {side === "left" ? "<" : ">"}
    </button>
  );
};

export default ArrowButton;
