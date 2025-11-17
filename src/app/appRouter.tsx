import { createBrowserRouter } from "react-router";
import BaseLayout from "./layouts/BaseLayout";
import { MainPage } from "@/pages/main";
import { MoviesPage } from "@/pages/movies";
import { MoviePage } from "@/pages/movie";
import { NotFoundPage } from "@/pages/notFound";

export const appRouter = createBrowserRouter([
  {
    element: <BaseLayout />,
    errorElement: <div>Error</div>,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/category/:category", element: <MoviesPage /> },
      { path: "/search", element: <MoviesPage /> },
      { path: "/movie/:id", element: <MoviePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
