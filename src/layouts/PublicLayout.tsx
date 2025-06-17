import PublicAppBar from "../components/navigation/PublicAppBar";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import WelcomeBanner from "../components/WelcomeHeroSection";

const PublicLayout = () => (
  <>
    <PublicAppBar />
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <WelcomeBanner />
      <Outlet />
    </Container>
  </>
);

export default PublicLayout;
