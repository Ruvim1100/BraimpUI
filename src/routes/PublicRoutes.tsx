import { paths } from "./Paths";
import PublicLayout from "../layouts/PublicLayout";
import { LandingPage } from "../pages/LandingPage";
import type { RouteObject } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { CallbackPage } from "../pages/CallbackPage";

const publicRoutes: RouteObject = {
  path: "/",
  element: <PublicLayout />,
  children: [
    { path: paths.landing, element: <LandingPage /> },
    { path: paths.login, element: <LoginPage /> },
    { path: paths.callback, element: <CallbackPage /> },
  ],
};

export default publicRoutes;
