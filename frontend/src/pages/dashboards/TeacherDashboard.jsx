import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import { Box, Typography, Card, CardContent, CardActions, Button, CircularProgress, Grid } from '@mui/material';
import AddGradeModal from '../../components/AddGradeModal';

const TeacherDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

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
      // You can add a success message here, e.g., using a snackbar
      console.log("Grade added successfully!");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>My Courses</Typography>
      <Grid container spacing={3}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{course.name}</Typography>
                  <Typography color="text.secondary">{course.semester}</Typography>
                  <Typography variant="body2">{course.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate(`/course/${course._id}/grades`)}>
                    View Grades
                  </Button>
                  <Button size="small" onClick={() => handleOpenModal(course)}>
                    Add Grade
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography sx={{ ml: 2 }}>You have not created any courses yet.</Typography>
        )}
      </Grid>
      
      {selectedCourse && (
        <AddGradeModal
          open={modalOpen}
          handleClose={handleCloseModal}
          courseId={selectedCourse._id}
        />
      )}
    </Box>
  );
};

export default TeacherDashboard;