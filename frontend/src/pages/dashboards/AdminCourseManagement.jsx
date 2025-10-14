import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Button, 
  IconButton, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  CircularProgress
} from '@mui/material';
import CreateCourseModal from '../../components/CreateCourseModal';
import EditCourseModal from '../../components/EditCourseModal';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';

const AdminCourseManagement = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for filters
  const [teacherFilter, setTeacherFilter] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState('all');

  // State for modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  
  // State to hold the specific course for editing or deleting
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      let url = '/courses?';
      if (teacherFilter !== 'all') url += `teacherId=${teacherFilter}&`;
      if (semesterFilter !== 'all') url += `semester=${semesterFilter}&`;

      const response = await api.get(url);
      setCourses(response.data);
      
      // Dynamically get unique semesters for the filter dropdown from ALL courses
      if (teacherFilter === 'all' && semesterFilter === 'all') {
        const allCoursesResponse = await api.get('/courses');
        const uniqueSemesters = [...new Set(allCoursesResponse.data.map(course => course.semester).filter(Boolean))];
        setSemesters(uniqueSemesters);
      }
    } catch (err) { 
      console.error("Failed to fetch courses", err); 
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch teachers for the filter dropdown only once
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get('/users?role=teacher');
        setTeachers(response.data);
      } catch (err) { 
        console.error("Failed to fetch teachers", err); 
      }
    };
    fetchTeachers();
  }, []);

  // Re-fetch courses when filters change
  useEffect(() => {
    fetchCourses();
  }, [teacherFilter, semesterFilter]);

  const handleEditClick = (course) => { 
    setCourseToEdit(course); 
    setEditModalOpen(true); 
  };

  const handleDeleteClick = (course) => { 
    setCourseToDelete(course); 
    setConfirmOpen(true); 
  };

  const handleConfirmDelete = async () => {
    if (!courseToDelete) return;
    try {
      await api.delete(`/courses/${courseToDelete._id}`);
      fetchCourses(); // Refresh the list
    } catch (err) { 
      console.error("Failed to delete course", err); 
    } 
    finally { 
      setConfirmOpen(false); 
      setCourseToDelete(null); 
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" gutterBottom>Course Management</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* Filters */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Filter by Teacher</InputLabel>
            <Select value={teacherFilter} label="Filter by Teacher" onChange={(e) => setTeacherFilter(e.target.value)}>
              <MenuItem value="all">All Teachers</MenuItem>
              {teachers.map(t => <MenuItem key={t._id} value={t._id}>{t.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Filter by Semester</InputLabel>
            <Select value={semesterFilter} label="Filter by Semester" onChange={(e) => setSemesterFilter(e.target.value)}>
              <MenuItem value="all">All Semesters</MenuItem>
              {semesters.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={() => setCreateModalOpen(true)}>Create Course</Button>
        </Box>
      </Box>
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Teacher</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.teacherId?.name || 'N/A'}</TableCell>
                  <TableCell>{course.semester}</TableCell>
                  <TableCell align="right">
                    <IconButton title="Manage Enrollment" color="default" onClick={() => navigate(`/course/${course._id}/enroll`)}>
                      <PeopleIcon />
                    </IconButton>
                    <IconButton title="Edit Course" color="primary" onClick={() => handleEditClick(course)}><EditIcon /></IconButton>
                    <IconButton title="Delete Course" color="error" onClick={() => handleDeleteClick(course)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modals */}
      <CreateCourseModal open={createModalOpen} handleClose={() => setCreateModalOpen(false)} refreshCourses={fetchCourses} />
      
      {courseToEdit && (
        <EditCourseModal 
          open={editModalOpen} 
          handleClose={() => setEditModalOpen(false)} 
          refreshCourses={fetchCourses} 
          course={courseToEdit} 
        />
      )}
      
      {courseToDelete && (
        <ConfirmationDialog 
          open={confirmOpen} 
          onClose={() => setConfirmOpen(false)} 
          onConfirm={handleConfirmDelete} 
          title="Delete Course" 
          message={`Are you sure you want to delete the course "${courseToDelete.name}"? This action cannot be undone.`} 
        />
      )}
    </Box>
  );
};

export default AdminCourseManagement;