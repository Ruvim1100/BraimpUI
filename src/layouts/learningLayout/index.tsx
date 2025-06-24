import { CircularProgress, Container } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../../routes/paths";
import { useAuth } from "react-oidc-context";
import PrivateBar from "./components/PrivateAppBar";

const LearningLayout = () => {
  const { isLoading, user } = useAuth();

  if (isLoading) return <CircularProgress />;
  if (!user) return <Navigate to={paths.public.landing} replace />;

  return (
    <>
      <PrivateBar />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
};

export default LearningLayout;
