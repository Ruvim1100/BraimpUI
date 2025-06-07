import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import SwitchThemeToggle from "./SwitchThemeToggle";
import { Container } from "@mui/material";
import LanguageMenu from "./LanguageMenu";
import logo from "../assets/logo.png";
import { useTranslation } from "react-i18next";

const PublicAppBar = () => {
  const { t } = useTranslation();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box
              component="img"
              src={logo}
              alt="Braimp Logo"
              sx={{ height: "3rem" }}
            />
          </Box>

          <Box>
            <Button
              component={RouterLink}
              to="/howItWorks"
              sx={{ color: "text.primary" }}
            >
              {t("howItWorks")}
            </Button>
            <Button
              component={RouterLink}
              to="/features"
              sx={{ color: "text.primary" }}
            >
              {t("features")}
            </Button>
            <Button
              component={RouterLink}
              to="/AiFunctions"
              sx={{ color: "text.primary" }}
            >
              {t("aiFunctions")}
            </Button>

            <Button
              component={RouterLink}
              to="/pricing"
              sx={{ color: "text.primary" }}
            >
              {t("pricing")}
            </Button>

            <Button
              component={RouterLink}
              to="/about"
              sx={{ color: "text.primary" }}
            >
              {t("about")}
            </Button>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
              {t("signIn")}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PublicAppBar;
