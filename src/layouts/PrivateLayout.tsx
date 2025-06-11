import { Box } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthUser } from "../auth/useAuthUser";
import { paths } from "../routes/Paths";

const PrivateLayout = () => {
  const { isLoading, user } = useAuthUser();

  if (isLoading) return <div>Loading auth…</div>;
  if (!user)     return <Navigate to={paths.landing} replace />;

  return (
    <Box>
      {}
      <Outlet />
    </Box>
  );
};

export default PrivateLayout;
