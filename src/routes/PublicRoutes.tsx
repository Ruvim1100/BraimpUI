import { paths } from './Paths';
import PublicLayout from '../layouts/PublicLayout';
import { LandingPage } from '../pages/LandingPage';
import type { RouteObject } from 'react-router-dom';


const publicRoutes: RouteObject = {
  path: '/',
  element: <PublicLayout />,
  children: [
    { path: paths.landing, element: <LandingPage /> },
  ],
};

export default publicRoutes;