import { BrowserRouter, useRoutes } from 'react-router-dom';
import publicRoutes from './publicRoutes';
import learningRoutes from './learningRoutes';
import adminRoutes from './adminRoutes';
import courseRoutes from './courseRoutes';

const allRoutes = [publicRoutes, learningRoutes, courseRoutes, adminRoutes];

const AppRoutes = () => useRoutes(allRoutes);

const Router = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default Router;
