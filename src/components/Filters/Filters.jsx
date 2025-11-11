import styles from "./styles.module.css";
import Dropdown from "../../ui/Dropdown/Dropdown";
import Button from "../../ui/Button/Button";
import useFilters from "../../hooks/useFilters";

const Filters = () => {
  const {
    filterConfigs,
    getFilterProps,
    handleResetFilters,
    fetchMoviesByFilters,
  } = useFilters();
  return (
    <div className={styles.filters}>
      {filterConfigs.map(({ key }) => (
        <Dropdown key={key} {...getFilterProps(key)} />
      ))}
      <div className={styles.buttons}>
        <Button text={"Сбросить фильтры"} onClick={handleResetFilters} />
        <Button text={"Найти"} onClick={fetchMoviesByFilters} />
      </div>
    </div>
  );
};

export default Filters;
