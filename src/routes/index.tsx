import { BrowserRouter, useRoutes } from 'react-router-dom';
import publicRoutes from './publicRoutes';
import learningRoutes from './learningRoutes';
import studioRoutes from './studioRoutes';
import adminRoutes from './adminRoutes';

const allRoutes = [publicRoutes, learningRoutes, studioRoutes, adminRoutes];

const AppRoutes = () => useRoutes(allRoutes);

const Router = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default Router;
