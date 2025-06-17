import type { RouteObject } from "react-router-dom";
import PrivateLayout from "../layouts/PrivateLayout";
import { DashboardPage } from "../pages/DashboardPage";
import { paths } from "./Paths";

const privateRoutes: RouteObject = {
  path: "/",
  element: <PrivateLayout />,
  children: [
    { path: paths.dashboard,  element: <DashboardPage /> }
  ],
};

export default privateRoutes;
