import { createBrowserRouter } from "react-router";
import { HomePage } from "@/pages/home";
import { CabinetPage } from "@/pages/cabinet";
import { EditorPage } from "@/pages/ediitor";
import { AppRoutes } from "@/shared/const/routes";

export const router = createBrowserRouter([
  {
    path: AppRoutes.HOME.path,
    Component: HomePage,
  },
  {
    path: AppRoutes.CABINET.path,
    Component: CabinetPage,
  },
  {
    path: AppRoutes.EDITOR.path,
    Component: EditorPage,
  },
]);
