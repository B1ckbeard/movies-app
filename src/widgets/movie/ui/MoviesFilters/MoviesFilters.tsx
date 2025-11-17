import Button from "@/shared/ui/Button/Button";
import Dropdown from "@/shared/ui/Dropdown/Dropdown";
import styles from "./styles.module.css";
import useFilters from "@/shared/hooks/useFilters";

interface Props {
  onSearch: () => void;
}

const MoviesFilters = ({ onSearch }: Props) => {
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

export default MoviesFilters;
