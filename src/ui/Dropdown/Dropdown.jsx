import styles from "./styles.module.css";

const Dropdown = ({ optionList, name, value, onChange }) => {
  return (
    <select
      className={styles.select}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>
        {name}
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
