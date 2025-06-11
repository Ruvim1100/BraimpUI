import type { RouteObject } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import { LandingPage } from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";

const publicRoutes: RouteObject = {
  path: "/",
  element: <PublicLayout />,
  children: [
    { index: true, element: <LandingPage /> },
    { path: "*", element: <NotFoundPage /> },
  ],
};

export default publicRoutes;
