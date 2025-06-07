import PublicAppBar from '../components/PublicAppBar';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <PublicAppBar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default PublicLayout;