import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import { ThemeProvider, CssBaseline, Box, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { getTheme } from './theme';
import { AnimatePresence } from 'framer-motion';
import PageAnimation from './components/PageAnimation';
import DashboardPage from './pages/DashboardPage';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import CourseGradesPage from './pages/dashboards/CourseGradesPage';
import EnrollmentPage from './pages/dashboards/EnrollmentPage';
import DashboardLayout from './components/DashboardLayout'; // 1. Import the new layout

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};


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
      <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1300 }}>
        <IconButton onClick={toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public routes */}
          <Route path="/" element={<PageAnimation><LandingPage /></PageAnimation>} />
          <Route path="/login" element={<PageAnimation><LoginPage /></PageAnimation>} />

          {/* Protected Dashboard Routes */}
          <Route 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<PageAnimation><DashboardPage /></PageAnimation>} />
            <Route path="/course/:courseId/grades" element={<PageAnimation><CourseGradesPage /></PageAnimation>} />
            <Route path="/course/:courseId/enroll" element={<PageAnimation><EnrollmentPage /></PageAnimation>} />
          </Route>
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;