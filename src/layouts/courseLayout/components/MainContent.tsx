import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Container } from "@mui/material";

const drawerWidth = 240;

interface MainContentProps {
  open: boolean;
  children: React.ReactNode;
}

const StyledMain = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<Pick<MainContentProps, "open">>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? 0 : `-${drawerWidth}px`,
}));

export const MainContent: React.FC<MainContentProps> = ({ open, children }) => {
  const theme = useTheme(); 

  return (
    <StyledMain open={open}>
      <div style={{ ...theme.mixins.toolbar }} />
      <Container maxWidth="xl">
        {children}
      </Container>
    </StyledMain>
  );
};
