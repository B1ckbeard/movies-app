import styles from "./styles.module.css";
import { useState } from "react";
import { useGetMoviesByCategoryQuery } from "../../api/moviesApi";
import Carousel from "../Carousel/Carousel";
import Categories from "../Categories/Categories";
import popularCategoriesType from "../../popularCategoriesType";

const PopularMovies = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    popularCategoriesType[0]
  );

  const { data, error, isLoading } = useGetMoviesByCategoryQuery({
    category: selectedCategory.slug,
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  if (error) {
    return null;
  }

  return (
    <section className={styles.popularSection}>
      <Categories
        categories={popularCategoriesType}
        selectedCategory={selectedCategory}
        onClick={handleCategoryClick}
      />
      <Carousel
        movies={data?.docs}
        title={selectedCategory.category}
        query={`/category/${selectedCategory.slug}`}
        isLoading={isLoading}
      />
    </section>
  );
};

export default PopularMovies;
