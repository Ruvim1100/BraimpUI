import { CircularProgress, Container } from "@mui/material";
import { useAuth } from "react-oidc-context";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../../routes/paths";
import AdminAppBar from "./components/AdminAppBar";

const AdminLayout = () => {
  const { isLoading, user } = useAuth();
  if (isLoading) return <CircularProgress />;
  if (!user) return <Navigate to={paths.public.landing} replace />;

  return (
    <>  
      <AdminAppBar />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
};

export default AdminLayout;
