import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button
} from '@mui/material';

const CourseGradesPage = () => {
  const { courseId } = useParams(); // Get courseId from the URL
  const navigate = useNavigate();
  const [grades, setGrades] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        // We'll also fetch the course details to display the name
        const courseRes = await api.get(`/courses/${courseId}`);
        setCourseName(courseRes.data.name);

        const gradesRes = await api.get(`/grades/course/${courseId}`);
        setGrades(gradesRes.data);
      } catch (err) {
        setError('Failed to fetch grades for this course.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [courseId]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Button onClick={() => navigate('/dashboard')} sx={{ mb: 2 }}>
        &larr; Back to Dashboard
      </Button>
      <Typography variant="h4" gutterBottom>Grades for {courseName}</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Student Email</TableCell>
              <TableCell align="right">Marks</TableCell>
              <TableCell align="right">Grade</TableCell>
              <TableCell>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grades.map((grade) => (
              <TableRow key={grade._id}>
                <TableCell>{grade.studentId ? grade.studentId.name : 'N/A'}</TableCell>
                <TableCell>{grade.studentId ? grade.studentId.email : 'N/A'}</TableCell>
                <TableCell align="right">{grade.marks}</TableCell>
                <TableCell align="right">{grade.grade}</TableCell>
                <TableCell>{grade.comments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CourseGradesPage;