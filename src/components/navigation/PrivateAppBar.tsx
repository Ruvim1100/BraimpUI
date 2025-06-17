import { AppBar, Box, Container, Toolbar } from "@mui/material";
import SwitchThemeToggle from "../common/SwitchThemeToggle";
import LanguageMenu from "../common/LanguageMenu";
import Logo from "../common/Logo";
import SearchBar from "../common/SearhBar";
import UserMenu from "../common/UserMenu";

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
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, flex: 1 }}>
            <Logo />
            <SearchBar
              onSearch={() => {
                throw new Error("Function not implemented.");
              }}
            />
          </Box>

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
