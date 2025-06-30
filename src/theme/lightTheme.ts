import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "rgb(20, 148, 129)",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "rgb(225, 242, 239)",
      contrastText: "rgb(255, 255, 255)",
    },
    background: {
      default: "rgb(250, 250, 250)",
      paper: "#ffffff",
    },
    text: {
      primary: "rgb(70, 75, 80)",
      secondary: "#6b7c93",
    },
    divider: "#e0e0e0",
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    button: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "6px 16px",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: undefined,
          },
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(250, 250, 250)",
          color: "#2f3e4d",
          borderBottom: "none",
          boxShadow: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(250, 250, 250)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgb(250, 250, 250)",
        },
      },
    },
    MuiAvatar:{
      styleOverrides: {
        root: {
          backgroundColor: "rgb(22, 176, 152)"
        }
      }
    }
  },
});

export default lightTheme;
