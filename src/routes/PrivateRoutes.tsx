import type { RouteObject } from "react-router-dom";
import PrivateLayout from "../layouts/privateLayout";
import { paths } from "./Paths";
import DashboardPage from "../pages/dashboard/index";

const privateRoutes: RouteObject = {
  path: paths.dashboard,
  element: <PrivateLayout />,
  children: [
    { index: true,  element: <DashboardPage /> }
  ],
};

export default privateRoutes;
