import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2D3A8C',
      contrastText: '#fff',
    },
    secondary: {
      main: '#1BC5B4',
      contrastText: '#fff',
    },
    background: {
      default: '#f6f7fb',
      paper: '#fff',
    },
    text: {
      primary: '#2D3A8C',
      secondary: '#555',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Poppins, Inter, Roboto, Arial, sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: 'none' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(44, 58, 140, 0.08)',
        },
        containedPrimary: {
          backgroundColor: '#1BC5B4',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#159e8c',
          },
        },
        outlinedPrimary: {
          color: '#1BC5B4',
          borderColor: '#1BC5B4',
          '&:hover': {
            backgroundColor: '#e6faf8',
            borderColor: '#159e8c',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 4px 24px rgba(44, 58, 140, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: '#fff',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 4px 24px rgba(44, 58, 140, 0.08)',
        },
      },
    },
  },
});

export default theme; 