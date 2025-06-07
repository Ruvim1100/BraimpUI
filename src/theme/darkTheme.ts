import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#148f7c",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#149481",
      contrastText: "#ffffff",
    },
    background: {
      default: "#3c4144",
      paper: "#3c4144",
    },
    text: {
      primary: "#eaeaea",
      secondary: "#b6bfc6",
    },
    divider: "#4a4f52",
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    button: { fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#323639",
        },
      },
    },
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
          backgroundColor: "#3c4144",
          color: "#ffffff",
          borderBottom: "none",
          boxShadow: "none",
          borderRadius: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "#3c4144",
        },
      },
    },
  },
});

export default darkTheme;
