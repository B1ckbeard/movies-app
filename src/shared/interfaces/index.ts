export interface Genre {
  name: string;
  slug?: string;
}

export interface Country {
  name: string;
  slug?: string;
}

export interface Rating {
  kp?: number;
  imdb?: number;
}

export interface Person {
  name: string;
  profession: string;
}

interface Poster {
  previewUrl?: string;
  url?: string;
}

export interface Movie {
  id: number;
  name?: string;
  alternativeName?: string;
  description?: string;
  year?: number;
  movieLength?: number;
  rating: Rating;
  genres?: Genre[];
  countries?: Country[];
  persons?: Person[];
  similarMovies?: Movie[];
  poster?: Poster;
}

export interface CategoryItem {
  id: number;
  slug: string;
  category: string;
}
