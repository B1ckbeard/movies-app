import styles from "./styles.module.css";

const Dropdown = ({ optionList, placeholder, value, onChange }) => {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {optionList.map((option) => (
        <option key={option.name || option} value={option.name || option}>
          {option.name || option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
