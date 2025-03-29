import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff3366', // Modern red
      light: '#ff6b93',
      dark: '#e62e5c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#444444', // Dark gray
      light: '#666666',
      dark: '#333333',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#111111',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 800,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 50, // Fully rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 24px',
        },
        contained: {
          backgroundColor: '#ff3366',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#e62e5c',
            boxShadow: '0 6px 16px rgba(255, 51, 102, 0.3)',
          },
        },
        outlined: {
          borderColor: '#ff3366',
          color: '#ff3366',
          '&:hover': {
            backgroundColor: 'rgba(255, 51, 102, 0.08)',
            borderColor: '#e62e5c',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#111111',
        },
      },
    },
  },
});

export default theme; 