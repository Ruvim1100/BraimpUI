import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#149481",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#16b098",
      contrastText: "#ffffff",
    },
    background: {
      default: "rgb(250, 250, 250)",
      paper: "#ffffff",
    },
    text: {
      primary: "#2f3e4d",
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
          backgroundColor: "rgb(255, 255, 255)",
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
      styleOverrides:{
        root:{
          backgroundColor: "rgb(250, 250, 250)"
        }
      }
    }
  },
});

export default lightTheme;
