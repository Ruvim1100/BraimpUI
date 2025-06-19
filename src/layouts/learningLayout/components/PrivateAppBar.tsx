import { AppBar, Box, Container, Toolbar } from "@mui/material";
import LanguageMenu from "../../../components/LanguageMenu";
import Logo from "../../../components/Logo";
import UserMenu from "../../../components/UserMenu";
import SwitchThemeToggle from "../../../components/SwitchThemeToggle";

const PrivateBar = () => {
  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >

          <Logo />
          {/* <Box sx={{ display: "flex", alignItems: "center", gap: 3, flex: 1 }}>
            <Logo />
            <SearchBar
              onSearch={() => {
                throw new Error("Function not implemented.");
              }}
            />
          </Box> */}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LanguageMenu />
            <SwitchThemeToggle />

            {/* <IconButton sx={{ p: 1 }}>
              <NotificationsNoneIcon fontSize="medium" />
            </IconButton> */}

            <UserMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PrivateBar;
