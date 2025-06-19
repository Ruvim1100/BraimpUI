import type { RouteObject } from "react-router-dom";
import { paths } from "./paths";
import AdminLayout from "../layouts/adminLayout";
import NotFoundPage from "../pages/notFoundPage";

const adminRoutes: RouteObject = {
  path: paths.admin.base,
  element: <AdminLayout />,
  children: [    
    {index: true, element: <NotFoundPage/>}
  ],
};

export default adminRoutes;
