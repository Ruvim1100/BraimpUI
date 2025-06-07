import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import SwitchThemeToggle from "./SwitchThemeToggle";
import { Container } from "@mui/material";
import LanguageMenu from "./LanguageMenu";
import logo from "../assets/logo.png";

const PublicAppBar = () => {
  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box component="img" src={logo} alt="Braimp Logo" sx={{height: '3rem'}}/>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              component={RouterLink}
              to="/about"
              sx={{ color: "text.primary" }}
            >
              About
            </Button>
            <Button
              component={RouterLink}
              to="/features"
              sx={{ color: "text.primary" }}
            >
              Features
            </Button>
            <SwitchThemeToggle />
            <LanguageMenu />
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              sx={{
                backgroundColor: "#d0eeea",
                color: "#16b098",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#bee6e0",
                  boxShadow: "none",
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PublicAppBar;
