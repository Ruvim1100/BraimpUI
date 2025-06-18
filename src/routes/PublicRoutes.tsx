import type { RouteObject } from "react-router-dom";
import { LandingPage } from "../pages/landingPage";
import NotFoundPage from "../pages/notFoundPage";
import PublicLayout from "../layouts/publicLayout";

const publicRoutes: RouteObject = {
  path: "/",
  element: <PublicLayout />,
  children: [
    { index: true, element: <LandingPage /> },
    { path: "*", element: <NotFoundPage /> },
  ],
};

export default publicRoutes;
