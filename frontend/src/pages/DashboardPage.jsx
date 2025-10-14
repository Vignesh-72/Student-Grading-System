import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import TeacherDashboard from './dashboards/TeacherDashboard'; // 1. Import the new component
import AdminDashboard from './dashboards/AdminDashboard';

import { 
  Box, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  CircularProgress 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch grades only if the user is a student
    if (user && user.role === 'student') {
      const fetchGrades = async () => {
        try {
          const response = await api.get(`/grades/student/${user._id}`);
          setGrades(response.data);
        } catch (err) {
          setError('Failed to fetch grades.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchGrades();
    } else if (user) {
      // Handle other roles later
      setLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderStudentDashboard = () => (
    <>
      <Typography variant="h5" gutterBottom>My Grades</Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell align="right">Marks</TableCell>
                <TableCell align="right">Grade</TableCell>
                <TableCell>Comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grades.map((grade) => (
                <TableRow key={grade._id}>
                  <TableCell component="th" scope="row">
                    {grade.courseId ? grade.courseId.name : 'N/A'}
                  </TableCell>
                  <TableCell align="right">{grade.marks}</TableCell>
                  <TableCell align="right">{grade.grade}</TableCell>
                  <TableCell>{grade.comments}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Welcome, {user ? user.name : 'User'}!</Typography>
      
      {/* Conditionally render dashboards based on role */}
      {user && user.role === 'student' && renderStudentDashboard()}
      {user && user.role === 'teacher' && <TeacherDashboard />}
      {user && user.role === 'admin' && <AdminDashboard />} {/* 2. Use the component here */}
      <Button variant="contained" color="error" onClick={handleLogout} sx={{ mt: 4 }}>
        Logout
      </Button>
    </Box>
  );
};

export default DashboardPage;