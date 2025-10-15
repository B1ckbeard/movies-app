import { useState } from "react";
import styles from "./styles.module.css";

const categories = ["Популярные фильмы", "Популярные сериалы"];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("Популярные фильмы");
  return (
    <div className={styles.categories}>
      {categories.map((category) => {
        return (
          <button
            onClick={() => setSelectedCategory(category)}
            key={category}
            className={
              category === selectedCategory ? styles.active : styles.item
            }
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
