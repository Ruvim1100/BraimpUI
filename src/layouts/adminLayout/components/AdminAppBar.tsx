import { AppBar, Box, Container, Toolbar } from "@mui/material";
import LanguageMenu from "../../../components/LanguageMenu";
import { Link as RouterLink } from "react-router-dom";
import UserMenu from "../../../components/UserMenu";
import logo from "../../../assets/styledLogo.png";
import SwitchThemeToggle from "../../../components/SwitchThemeToggle";

const PrivateBar = () => {
  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            component={RouterLink}
            to="/learning"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box
              component="img"
              src={logo}
              alt="Braimp Logo"
              sx={{ height: "2rem" }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LanguageMenu />
            <SwitchThemeToggle />
            <UserMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PrivateBar;
