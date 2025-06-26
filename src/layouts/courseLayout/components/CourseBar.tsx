import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import LanguageMenu from "../../../components/LanguageMenu";
import SwitchThemeToggle from "../../../components/SwitchThemeToggle";
import UserMenu from "../../../components/UserMenu";
import logo from "../../../assets/styledLogo.png";
import { Link as RouterLink } from 'react-router-dom';
import { Container } from "@mui/material";

const drawerWidth = 220;

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "onOpen",
})<Pick<CourseAppBarProps, "open">>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export interface CourseAppBarProps extends Omit<MuiAppBarProps, "children"> {
  open: boolean;
  onOpen: () => void;
}

export const CourseAppBar: React.FC<CourseAppBarProps> = ({
  open,
  onOpen,
  ...muiProps
}) => {
  return (
    <StyledAppBar position="fixed" open={open} {...muiProps} elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Container maxWidth="xl" disableGutters sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={onOpen}
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component={RouterLink}
            to="/learning"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Braimp Logo"
              sx={{ height: "2rem" }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LanguageMenu />
          <SwitchThemeToggle />
          <UserMenu />
        </Box>
        </Container>
      </Toolbar>
    </StyledAppBar>
  );
};
