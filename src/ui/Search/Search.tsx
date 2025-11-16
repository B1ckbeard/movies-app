import { useState, KeyboardEvent, ChangeEvent } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = (): void => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={styles.search}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Поиск..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button
        className={styles.searchButton}
        onClick={handleSearch}
        disabled={!searchQuery.trim()}
      >
        Найти
      </button>
    </div>
  );
};

export default Search;
