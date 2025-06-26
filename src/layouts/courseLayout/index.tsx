import { Box, CircularProgress } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../../routes/paths";
import { useAuth } from "react-oidc-context";
import { CourseAppBar } from "./components/CourseBar";
import { useState } from "react";
import { MainContent } from "./components/MainContent";
import { DrawerMenu } from "./components/DrawerMenu";

const CourseLayout = () => {
  const { isLoading, user } = useAuth();
  const [open, setOpen] = useState(true);

  if (isLoading) return <CircularProgress />;
  if (!user) return <Navigate to={paths.public.landing} replace />;

  return (
    <Box sx={{ display: 'flex' }}>
      <CourseAppBar open={open} onOpen={() => setOpen(true)} />
      <DrawerMenu open={open} onClose={() => setOpen(false)} />
      <MainContent open={open}>
        <Outlet />
      </MainContent>
    </Box>
  );
};

export default CourseLayout;