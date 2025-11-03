import styles from "./styles.module.css";

const Button = ({ text, onClick, style={} }) => {
  return (
    <button className={`${styles.button}`} onClick={onClick} style={style}>
      {text}
    </button>
  );
};

export default Button;
