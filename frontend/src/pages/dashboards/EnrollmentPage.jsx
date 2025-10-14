import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';

const EnrollmentPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCourseDetails = useCallback(async () => {
    try {
      const response = await api.get(`/courses/${courseId}`);
      setCourse(response.data);
    } catch (err) {
      setError('Failed to fetch course details.');
    }
  }, [courseId]);

  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const response = await api.get('/users?role=student');
        setAllStudents(response.data);
      } catch (err) {
        setError('Failed to fetch students.');
      }
    };

    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchCourseDetails(), fetchAllStudents()]);
      setLoading(false);
    };

    loadData();
  }, [courseId, fetchCourseDetails]);

  const handleEnroll = async (studentId) => {
    try {
      await api.put(`/courses/${courseId}/enroll`, { studentId });
      // Refresh course details to update the enrolled students list
      fetchCourseDetails(); 
    } catch (err) {
      console.error('Failed to enroll student', err);
      setError('Failed to enroll student.');
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const enrolledStudentIds = new Set(course?.enrolledStudents.map(s => s._id));

  return (
    <Box sx={{ p: 4 }}>
      <Button onClick={() => navigate('/dashboard')} sx={{ mb: 2 }}>
        &larr; Back to Dashboard
      </Button>
      <Typography variant="h4" gutterBottom>Manage Enrollment</Typography>
      <Typography variant="h6" color="text.secondary">Course: {course?.name}</Typography>

      <Paper sx={{ mt: 4 }}>
        <List>
          {allStudents.map((student, index) => (
            <React.Fragment key={student._id}>
              <ListItem>
                <ListItemText 
                  primary={student.name}
                  secondary={student.email}
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleEnroll(student._id)}
                    disabled={enrolledStudentIds.has(student._id)}
                  >
                    {enrolledStudentIds.has(student._id) ? 'Enrolled' : 'Add'}
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              {index < allStudents.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default EnrollmentPage;