import type { RouteObject } from "react-router-dom";
import { paths } from "./paths.ts";
import StudioLayout from "../layouts/studioLayout/index.tsx";
import NotFoundPage from "../pages/notFoundPage/index.tsx";

const studioRoutes: RouteObject = {
  path: paths.studio.base,
  element: <StudioLayout />,
  children: [{ index: true, element: <NotFoundPage /> }],
};

export default studioRoutes;
