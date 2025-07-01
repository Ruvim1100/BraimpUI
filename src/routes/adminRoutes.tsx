import type { RouteObject } from "react-router-dom";
import { paths } from "./paths";
import AdminLayout from "../layouts/adminLayout";
import { DashboardPage } from "../pages/admin/dashboard";

const adminRoutes: RouteObject = {
  path: paths.admin.base,
  element: <AdminLayout />,
  children: [    
    {index: true, element: <DashboardPage/>}
  ],
};

export default adminRoutes;
