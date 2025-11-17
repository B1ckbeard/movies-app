import { CategoryItem } from "@/shared/interfaces";
import styles from "./styles.module.css";

interface Props {
  categories: CategoryItem[];
  selectedCategory: CategoryItem;
  onClick: (category: CategoryItem) => void;
}

const Categories = ({ categories, selectedCategory, onClick }: Props) => {
  return (
    <div className={styles.categories}>
      {categories.map((category) => {
        return (
          <button
            onClick={() => onClick(category)}
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
