import { Genre, Country } from "@/interfaces";
import styles from "./styles.module.css";

interface Props {
  optionList: number[] | Genre[] | Country[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const Dropdown = ({ optionList, placeholder, value, onChange }: Props) => {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {optionList.map((option) => {
        const key = typeof option === "number" ? option : option.name;
        const displayValue =
          typeof option === "number" ? option.toString() : option.name;
        return (
          <option key={key} value={displayValue}>
            {displayValue}
          </option>
        );
      })}
    </select>
  );
};

export default Dropdown;
