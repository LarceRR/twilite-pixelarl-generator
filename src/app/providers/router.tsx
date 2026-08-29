import { createBrowserRouter } from "react-router";
import { HomePage } from "@/pages/home";
import { AppRoutes } from "@/shared/const/routes";

export const router = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    Component: HomePage,
  },
]);
