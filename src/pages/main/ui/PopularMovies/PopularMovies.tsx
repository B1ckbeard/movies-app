import styles from "./styles.module.css";
import { useState } from "react";
import { CategoryItem } from "@/shared/interfaces";
import popularCategoriesType from "@/shared/popularCategoriesType";
import { MoviesCarousel } from "@/widgets/movie";
import { Categories } from "@/features/category";
import { useGetMoviesByCategoryQuery } from "@/entities/movie/api/moviesApi";

const PopularMovies = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    popularCategoriesType[0]
  );

  const { data, error, isLoading } = useGetMoviesByCategoryQuery({
    category: selectedCategory.slug,
  });

  const handleCategoryClick = (category: CategoryItem) => {
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
      <MoviesCarousel
        movies={data?.docs}
        title={selectedCategory.category}
        query={`/category/${selectedCategory.slug}`}
        isLoading={isLoading}
      />
    </section>
  );
};

export default PopularMovies;
