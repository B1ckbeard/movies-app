import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/shared/index.css";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./appStore";
import { appRouter } from "./appRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);
