import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StudentDashboard from './dashboards/StudentDashboard';
import TeacherDashboard from './dashboards/TeacherDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="600">Welcome, {user ? user.name : 'User'}!</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      
      {/* Conditionally render the correct dashboard based on user role */}
      {user && user.role === 'student' && <StudentDashboard />}
      {user && user.role === 'teacher' && <TeacherDashboard />}
      {user && user.role === 'admin' && <AdminDashboard />}
    </Box>
  );
};

export default DashboardPage;