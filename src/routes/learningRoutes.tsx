import type { RouteObject } from "react-router-dom";
import { paths } from "./paths";
import LearningLayout from "../layouts/learningLayout";
import NotFoundPage from "../pages/notFoundPage";
import DashboardPage from "../pages/learning/dashboard";


const learningRoutes: RouteObject = {
  path: paths.learning.base,
  element: <LearningLayout/>,
  children: [
    {index: true, element: <DashboardPage />},
    {path: paths.notFound, element: <NotFoundPage/>}
  ]
};

export default learningRoutes;
