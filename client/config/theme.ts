import { createTheme } from '@mui/material';
import { grey, teal } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: grey.A700,
    },
    secondary: {
      main: teal.A700,
    },
    background: {
      default: '#111111',
      paper: '#222222',
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    MuiSvgIcon: {
      defaultProps: {
        fontSize: 'small',
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: 14,
        },
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
