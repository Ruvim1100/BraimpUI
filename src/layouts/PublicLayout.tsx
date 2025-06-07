import PublicAppBar from "../components/PublicAppBar";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import WelcomeBanner from "../components/WelcomeHeroSection";

const PublicLayout = () => {
  return (
    <>
      <PublicAppBar />
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <WelcomeBanner/>
        <Outlet />
      </Container>
    </>
  );
};

export default PublicLayout;
