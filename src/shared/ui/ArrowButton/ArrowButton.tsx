import { MouseEventHandler } from "react";
import styles from "./styles.module.css";

interface Props {
  side: string;
  offset?: number;
  color?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isFocused: boolean;
  disabled?: boolean;
}

const ArrowButton = ({
  side,
  offset = 0,
  color = "dark",
  onClick,
  isFocused = true,
  disabled = false,
}: Props) => {
  return (
    <button
      className={`${styles.arrow} ${
        color === "dark" ? styles.dark : styles.light
      } ${isFocused ? styles.visible : styles.hidden}`}
      style={side === "left" ? { left: offset } : { right: offset }}
      onClick={onClick}
      disabled={disabled}
    >
      {side === "left" ? "<" : ">"}
    </button>
  );
};

export default ArrowButton;
