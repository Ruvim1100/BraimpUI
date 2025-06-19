import type { RouteObject } from "react-router-dom";
import NotFoundPage from "../pages/notFoundPage";
import { LandingPage } from "../pages/public/landingPage";
import PublicLayout from "../layouts/publicLayout";
import { paths } from "./paths";


const publicRoutes: RouteObject = {
  path: paths.public.landing,
  element: <PublicLayout />,
  children: [
    { index: true, element: <LandingPage /> },
    { path: "*", element: <NotFoundPage /> },
  ],
};

export default publicRoutes;
