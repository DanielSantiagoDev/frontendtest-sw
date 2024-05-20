import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        background: {
            default: '#000000',
        },
        text: {
            primary: '#FFFFFF',
        },
    },
    typography: {
        h1: {
            fontFamily: '"Star Wars", sans-serif',
        },
        h2: {
            fontFamily: '"Star Wars", sans-serif',
            letterSpacing: '0.1em',
            color: '#FFE81F'
        },
        h3: {
            fontFamily: '"Star Jedi", sans-serif',
            letterSpacing: '0.1em',
            color: '#FFE81F'
        }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          padding: "50px 30px", // Adjust the padding as needed
          boxSizing: "border-box",
          maxWidth: "1080px",
          margin: "0 auto"
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#FFE81F',
          letterSpacing: '0.1em',
          fontFamily: '"Star Jedi", sans-serif',
          backgroundColor: '#000000',
          border: '1px solid #F8F8F8', 
          '&:hover': {
            backgroundColor: '#333333',
          },
          '&:disabled':{
            backgroundColor: 'white',
          }
        },
      },
    },
    MuiCardContent: {
        styleOverrides: {
          root: {
            backgroundColor: '#000000',
            border: '2px solid #FFE81F', 
            color: '#FFFFFF', 
          },
        },
      },
  },
});