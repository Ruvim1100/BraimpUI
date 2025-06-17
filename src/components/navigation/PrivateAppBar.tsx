import { AppBar, Box, Container, IconButton, Toolbar } from "@mui/material";
import SwitchThemeToggle from "../common/SwitchThemeToggle";
import LanguageMenu from "../common/LanguageMenu";
import Logo from "../common/Logo";
import SearchBar from "../common/SearhBar";
import UserMenu from "../common/UserMenu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const PrivateBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>

          <Box flex="1" display={"flex"} gap={2}>
            <Logo />
            <SearchBar
              onSearch={function (): void { throw new Error("Function not implemented."); }}/>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LanguageMenu />
            <SwitchThemeToggle />

            <IconButton>
              <NotificationsNoneIcon />
            </IconButton>

            <UserMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PrivateBar;
