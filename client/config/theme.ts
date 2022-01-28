import { createTheme } from '@mui/material';
import { grey, teal } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: grey[50],
    },
    secondary: {
      main: teal[400],
    },
    background: {
      default: '#121212',
      paper: grey[900],
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small',
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '6px 24px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        // size: 'small',
        variant: 'outlined',
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          zIndex: 30,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          zIndex: 40,
        },
        paper: {
          border: 'none',
        },
      },
    },
  },
});

export default theme;
