import { BrowserRouter, useRoutes } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes'

const allRoutes = [PublicRoutes, PrivateRoutes];

const AppRoutes = () => useRoutes(allRoutes);

const Router = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default Router;