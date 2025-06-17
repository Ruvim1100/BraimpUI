import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import SwitchThemeToggle from "../common/SwitchThemeToggle";
import { Container } from "@mui/material";
import LanguageMenu from "../common/LanguageMenu";
import { useTranslation } from "react-i18next";
import { SignInButton } from "../common/SignInButton";
import Logo from "../common/Logo";

const navLinks = [
  { to: "/howItWorks", label: "howItWorks" },
  { to: "/features", label: "features" },
  { to: "/AiFunctions", label: "aiFunctions" },
  { to: "/pricing", label: "pricing" },
  { to: "/about", label: "about" },
];

const PublicAppBar = () => {
  const { t } = useTranslation();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Logo />

          <Box sx={{ gap: 1 }}>
            {navLinks.map(({ to, label }) => (
              <Button
                key={to}
                component={RouterLink}
                to={to}
                sx={{ color: "text.primary" }}
              >
                {t(label)}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <LanguageMenu />
            <SwitchThemeToggle />
            <SignInButton />
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PublicAppBar;
