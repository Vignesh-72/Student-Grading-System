import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import { ThemeProvider, CssBaseline, Box, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { getTheme } from './theme';
import { AnimatePresence } from 'framer-motion';
import PageAnimation from './components/PageAnimation';

function App() {
  const [mode, setMode] = useState('light');
  const location = useLocation();
  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.setAttribute('data-color-mode', mode);
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
        <IconButton onClick={toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={<PageAnimation><LandingPage /></PageAnimation>}
          />
          <Route
            path="/login"
            element={<PageAnimation><LoginPage /></PageAnimation>}
          />
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;