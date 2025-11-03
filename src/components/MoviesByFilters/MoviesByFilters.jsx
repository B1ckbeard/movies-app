import styles from "./styles.module.css";
import { genresList } from "../../genresList";
import { countriesList } from "../../countriesList";
import Dropdown from "../../ui/Dropdown/Dropdown";
import { useCallback, useState } from "react";
import { getMoviesByFilters } from "../../moviesApi";
import Carousel from "../Carousel/Carousel";
import Button from "../../ui/Button/Button";
import _ from "lodash";

const MoviesByFilters = () => {
  const [filters, setFilters] = useState({
    "countries.name": "",
    "genres.name": "",
    year: "",
    "rating.kp": "",
  });
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateFilter = useCallback((filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      "countries.name": "",
      "genres.name": "",
      year: "",
      "rating.kp": "",
    });
  }, []);

  const fetchMoviesByFilters = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getMoviesByFilters(filters);
      console.log(response);
      setMovies(response.docs);
    } catch (error) {
      console.error("Ошибка:", error);
      if (error.statusCode === 403) {
        setError("Ошибка - суточный лимит запросов исчерпан");
      } else {
        setError("Ошибка загрузки");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const yearRange = _.range(2025, 1874);
  const ratingRange = _.range(9, 0);

  return (
    <>
      <section className={styles.filtersSection}>
        <h3 className={styles.title}>Фильмы по категориям</h3>
        <div className={styles.filters}>
          <Dropdown
            optionList={genresList}
            name={"Жанр"}
            value={filters["genres.name"]}
            onChange={(value) => updateFilter("genres.name", value)}
          />
          <Dropdown
            optionList={countriesList}
            name={"Страна"}
            value={filters["countries.name"]}
            onChange={(value) => updateFilter("countries.name", value)}
          />
          <Dropdown
            optionList={yearRange}
            name={"Год"}
            value={filters["year"]}
            onChange={(value) => updateFilter("year", value)}
          />
          <Dropdown
            optionList={ratingRange}
            name={"Рейтинг, от"}
            value={filters["rating.kp"]}
            onChange={(value) => updateFilter("rating.kp", `${value}-10`)}
          />
          <div className={styles.buttons}>
            <Button text={"Сбросить фильтры"} onClick={resetFilters} />
            <Button text={"Найти"} onClick={() => fetchMoviesByFilters()} />
          </div>
        </div>

        {!error && (
          <Carousel
            movies={movies}
            query={"/category/filtered"}
            isLoading={isLoading}
            filters={filters}
          />
        )}
      </section>
    </>
  );
};

export default MoviesByFilters;
