import styles from "./styles.module.css";
import Dropdown from "../../ui/Dropdown/Dropdown";
import Button from "../../ui/Button/Button";
import useFilters from "@/hooks/useFilters";

interface Props {
  onSearch: () => void;
}

const Filters = ({ onSearch }: Props) => {
  const { filterConfigs, getFilterProps, handleResetFilters } = useFilters();
  return (
    <div className={styles.filters}>
      {filterConfigs.map(({ key }: { key: string }) => (
        <Dropdown key={key} {...getFilterProps(key)} />
      ))}
      <div className={styles.buttons}>
        <Button text={"Сбросить фильтры"} onClick={handleResetFilters} />
        <Button text={"Найти"} onClick={onSearch} />
      </div>
    </div>
  );
};

export default Filters;
