import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#149481',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#16b098',
      contrastText: '#d0eeea'
    },
    background: {
      default:'#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#2f3e4d',
      secondary: '#6b7c93',
    },
    divider: '#e0e0e0',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 700, color: '#2f3e4d' },
    h2: { fontSize: '1.75rem', fontWeight: 700, color: '#2f3e4d' },
    h3: { fontSize: '1.5rem', fontWeight: 600, color: '#2f3e4d' },
    body1: { fontSize: '1rem', color: '#2f3e4d' },
    body2: { fontSize: '1rem', color: '##ffffff' },
    button: { fontWeight: 600 }, 
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '5px',
          paddingLeft: '15px',
          paddingRight: '15px',
          paddingTop: '5px',
          paddingBottom: '5px',
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#f8f9fa', 
          color: '#2f3e4d',   
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
  },
});

export default lightTheme;
