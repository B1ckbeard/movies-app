import { CSSProperties, MouseEventHandler } from "react";
import styles from "./styles.module.css";

interface Props {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}

const Button = ({ text, onClick, style = {} }: Props) => {
  return (
    <button className={`${styles.button}`} onClick={onClick} style={style}>
      {text}
    </button>
  );
};

export default Button;
