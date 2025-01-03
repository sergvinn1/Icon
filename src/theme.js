import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#CEB32D',
    },
    secondary: {
      main: '#9ABDBD',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 6px 10px 4px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        },
      },
    },
  },
});

export default theme;