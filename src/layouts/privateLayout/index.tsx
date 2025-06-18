import { Box, CircularProgress } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../../routes/Paths";
import PrivateBar from "./components/PrivateAppBar";
import { useAuth } from "react-oidc-context";

const PrivateLayout = () => {
  const { isLoading, user } = useAuth();

  if (isLoading) return <CircularProgress />;
  if (!user) return <Navigate to={paths.landing} replace />;

  return (
    <>
      <PrivateBar />
      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default PrivateLayout;
