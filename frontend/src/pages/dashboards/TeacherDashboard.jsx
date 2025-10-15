import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  CircularProgress, 
  Grid,
  useTheme,
  useMediaQuery,
  Stack,
  Chip,
  Paper
} from '@mui/material';
import AddGradeModal from '../../components/AddGradeModal';
import GradeIcon from '@mui/icons-material/Grade';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';

const TeacherDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (user) {
      const fetchCourses = async () => {
        try {
          const response = await api.get(`/courses?teacherId=${user._id}`);
          setCourses(response.data);
        } catch (err) {
          setError('Failed to fetch courses.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchCourses();
    }
  }, [user]);

  const handleOpenModal = (course) => {
    setSelectedCourse(course);
    setModalOpen(true);
  };

  const handleCloseModal = (success) => {
    setModalOpen(false);
    setSelectedCourse(null);
    if (success) {
      console.log("Grade added successfully!");
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography color="error" align="center" sx={{ p: 2 }}>{error}</Typography>;
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="600">My Courses</Typography>
        <Typography variant="body1" color="text.secondary">Manage your courses and student grades</Typography>
      </Box>

      {courses.length > 0 ? (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Card 
                elevation={2}
                sx={{ 
                  height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2,
                  transition: 'all 0.2s ease-in-out', '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows[4] },
                }}
              >
                <CardContent sx={{ flex: 1, p: 2.5 }}>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <Box sx={{ flex: 1, minWidth: 0 }}><Typography variant="h6">{course.name}</Typography></Box>
                      <Chip label={course.semester} size="small" color="primary" />
                    </Box>
                    {course.description && <Typography variant="body2" color="text.secondary">{course.description}</Typography>}
                    <Box sx={{ display: 'flex', gap: 3, pt: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><PeopleIcon sx={{ fontSize: '1.1rem', color: 'text.secondary' }} /><Typography variant="body2" color="text.secondary">{course.enrolledStudents?.length || 0} students</Typography></Box>
                    </Box>
                  </Stack>
                </CardContent>
                <CardActions sx={{ p: 2.5, pt: 1, gap: 1 }}>
                  <Button size="small" variant="outlined" startIcon={<VisibilityIcon />} onClick={() => navigate(`/course/${course._id}/grades`)} sx={{ flex: 1 }}>View Grades</Button>
                  <Button size="small" variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal(course)} sx={{ flex: 1 }}>Add Grade</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center', border: `1px dashed ${theme.palette.divider}` }}>
          <GradeIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">No Courses Found</Typography>
          <Typography variant="body2" color="text.secondary">You are not currently assigned to any courses.</Typography>
        </Paper>
      )}
      
      {selectedCourse && (
        <AddGradeModal open={modalOpen} handleClose={handleCloseModal} courseId={selectedCourse._id} />
      )}
    </Box>
  );
};

export default TeacherDashboard;