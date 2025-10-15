import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
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
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  Chip
} from '@mui/material';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (user) {
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
    }
  }, [user]);

  const MobileGradeCard = ({ grade }) => (
    <Card sx={{ mb: 2, borderRadius: 2 }}>
      <CardContent>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="subtitle1" fontWeight="600">{grade.courseId?.name || 'N/A'}</Typography>
            <Chip label={`Grade: ${grade.grade}`} color="primary" size="small" />
          </Box>
          <Typography variant="body2" color="text.secondary">Marks: {grade.marks} / 100</Typography>
          {grade.comments && <Typography variant="body2" sx={{ pt: 1, fontStyle: 'italic' }}>"{grade.comments}"</Typography>}
        </Stack>
      </CardContent>
    </Card>
  );

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>My Grades</Typography>
      {grades.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}><Typography>No grades have been assigned to you yet.</Typography></Paper>
      ) : isMobile ? (
        // Mobile Card View
        <Box>
          {grades.map((grade) => <MobileGradeCard key={grade._id} grade={grade} />)}
        </Box>
      ) : (
        // Desktop Table View
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
                  <TableCell component="th" scope="row">{grade.courseId?.name || 'N/A'}</TableCell>
                  <TableCell align="right">{grade.marks}</TableCell>
                  <TableCell align="right">{grade.grade}</TableCell>
                  <TableCell>{grade.comments}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default StudentDashboard;