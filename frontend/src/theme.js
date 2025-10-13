import { createTheme } from '@mui/material/styles';

// This function returns a theme object based on the mode
export const getTheme = (mode) => createTheme({
  palette: {
    mode, // This can be 'light' or 'dark'
    ...(mode === 'light'
      ? {
          // Palette values for light mode
          primary: { main: '#1976d2' },
          background: { default: '#F3F2F2', paper: '#f5f5f5' },
        }
      : {
          // Palette values for dark mode
          primary: { main: '#90caf9' },
          // --- THIS LINE IS CHANGED ---
          background: { default: '#2C3338', paper: '#3a3f47' },
        }),
  },
});