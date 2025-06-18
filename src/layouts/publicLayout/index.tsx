import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import PublicAppBar from "./components/PublicAppBar";
import WelcomeBanner from "../../pages/landingPage/components/WelcomeBanner";

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
