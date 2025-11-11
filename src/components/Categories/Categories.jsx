import styles from "./styles.module.css";

const Categories = ({ categories, selectedCategory, onClick }) => {
  return (
    <div className={styles.categories}>
      {categories.map((category) => {
        return (
          <button
            onClick={() => onClick?.(category)}
            key={category.id}
            className={`${styles.button} ${
              category === selectedCategory ? styles.active : ""
            }`}
          >
            {category.category}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
