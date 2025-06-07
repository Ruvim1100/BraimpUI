import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#16b098',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#149481',
      contrastText: '#d0eeea',
    },
    background: {
      default: '#1e222a',  // мягкий фон
      paper: '#252a33',    // немного светлее для карточек
    },
    text: {
      primary: '#f5f5f5',
      secondary: '#b0bec5',
    },
    divider: '#3a3f47',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 700, color: '#f5f5f5' },
    h2: { fontSize: '1.75rem', fontWeight: 700, color: '#f5f5f5' },
    h3: { fontSize: '1.5rem', fontWeight: 600, color: '#f5f5f5' },
    body1: { fontSize: '1rem', color: '#e0e0e0' },
    body2: { fontSize: '0.875rem', color: '#b0bec5' },
    button: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '5px',
          paddingLeft: '10px',
          paddingRight: '10px',
          paddingTop: '5px',
          paddingBottom: '5px',
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2c313a',
          color: '#ffffff',
          borderBottom: '1px solid #3a3f47',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundColor: '#252a33',
        },
      },
    },
  },
});

export default darkTheme;
