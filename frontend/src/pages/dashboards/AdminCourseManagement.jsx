import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  IconButton, FormControl, InputLabel, Select, MenuItem, CircularProgress, useTheme, useMediaQuery,
  Card, CardContent, Stack, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, TextField
} from '@mui/material';
import CreateCourseModal from '../../components/CreateCourseModal';
import EditCourseModal from '../../components/EditCourseModal';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import FilterListIcon from '@mui/icons-material/FilterList';

const AdminCourseManagement = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);

  const [teacherFilter, setTeacherFilter] = useState('all');
  const [semesterFilter, setSemesterFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  
  const [courseToEdit, setCourseToEdit] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [coursesRes, teachersRes] = await Promise.all([
        api.get('/courses'),
        api.get('/users?role=teacher')
      ]);
      setCourses(coursesRes.data);
      setTeachers(teachersRes.data);
      const uniqueSemesters = [...new Set(coursesRes.data.map(c => c.semester).filter(Boolean))];
      setSemesters(uniqueSemesters);
    } catch (err) {
      console.error("Failed to fetch initial data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);
  
  const handleEditClick = (course) => { setCourseToEdit(course); setEditModalOpen(true); };
  const handleDeleteClick = (course) => { setCourseToDelete(course); setConfirmOpen(true); };

  const handleConfirmDelete = async () => {
    if (!courseToDelete) return;
    try {
      await api.delete(`/courses/${courseToDelete._id}`);
      fetchInitialData();
    } catch (err) { console.error("Failed to delete course", err); } 
    finally { setConfirmOpen(false); setCourseToDelete(null); }
  };
  
  const filteredCourses = courses.filter(course => {
    const matchesTeacher = teacherFilter === 'all' || course.teacherId?._id === teacherFilter;
    const matchesSemester = semesterFilter === 'all' || course.semester === semesterFilter;
    const matchesSearch = course.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTeacher && matchesSemester && matchesSearch;
  });

  const MobileCourseCard = ({ course }) => (
    <Card sx={{ mb: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack spacing={1}>
          <Typography variant="subtitle2" fontWeight="600">{course.name}</Typography>
          <Typography variant="caption" color="text.secondary">Teacher: {course.teacherId?.name || 'N/A'}</Typography>
          <Typography variant="caption" color="text.secondary">Semester: {course.semester || 'N/A'}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5, mt: 1 }}>
            <Tooltip title="Manage Enrollment"><IconButton size="small" onClick={() => navigate(`/course/${course._id}/enroll`)}><PeopleIcon fontSize="small" /></IconButton></Tooltip>
            <Tooltip title="Edit"><IconButton size="small" color="primary" onClick={() => handleEditClick(course)}><EditIcon fontSize="small" /></IconButton></Tooltip>
            <Tooltip title="Delete"><IconButton size="small" color="error" onClick={() => handleDeleteClick(course)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
        <Typography variant="h5" gutterBottom sx={{m: 0, alignSelf: isMobile ? 'flex-start' : 'center'}}>Course Management</Typography>
        <Box sx={{ display: 'flex', gap: 2, width: isMobile ? '100%' : 'auto', flexDirection: isSmallMobile ? 'column' : 'row' }}>
          <TextField size="small" placeholder="Search courses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          {isMobile ? (
            <Button variant="outlined" size="small" startIcon={<FilterListIcon />} onClick={() => setFilterDialogOpen(true)}>Filters</Button>
          ) : (
            <>
              <FormControl size="small" sx={{ minWidth: 150 }}><InputLabel>Teacher</InputLabel><Select value={teacherFilter} label="Teacher" onChange={(e) => setTeacherFilter(e.target.value)}><MenuItem value="all">All Teachers</MenuItem>{teachers.map(t => <MenuItem key={t._id} value={t._id}>{t.name}</MenuItem>)}</Select></FormControl>
              <FormControl size="small" sx={{ minWidth: 150 }}><InputLabel>Semester</InputLabel><Select value={semesterFilter} label="Semester" onChange={(e) => setSemesterFilter(e.target.value)}><MenuItem value="all">All Semesters</MenuItem>{semesters.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}</Select></FormControl>
            </>
          )}
          <Button variant="contained" size="small" onClick={() => setCreateModalOpen(true)}>Create Course</Button>
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {loading ? <CircularProgress /> : isMobile ? (
          <Box>{filteredCourses.map(course => <MobileCourseCard key={course._id} course={course} />)}</Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead><TableRow><TableCell>Course Name</TableCell><TableCell>Teacher</TableCell><TableCell>Semester</TableCell><TableCell>Students</TableCell><TableCell align="right">Actions</TableCell></TableRow></TableHead>
              <TableBody sx={{'& .MuiTableRow-root:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover }}}>
                {filteredCourses.map(course => (
                  <TableRow key={course._id}>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.teacherId?.name || 'N/A'}</TableCell>
                    <TableCell>{course.semester}</TableCell>
                    <TableCell>{course.enrolledStudents.length}</TableCell>
                    <TableCell align="right">
                      <IconButton title="Manage Enrollment" onClick={() => navigate(`/course/${course._id}/enroll`)}><PeopleIcon /></IconButton>
                      <IconButton color="primary" onClick={() => handleEditClick(course)}><EditIcon /></IconButton>
                      <IconButton color="error" onClick={() => handleDeleteClick(course)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <CreateCourseModal open={createModalOpen} handleClose={() => setCreateModalOpen(false)} refreshCourses={fetchInitialData} />
      {courseToEdit && <EditCourseModal open={editModalOpen} handleClose={() => setEditModalOpen(false)} refreshCourses={fetchInitialData} course={courseToEdit} />}
      {courseToDelete && <ConfirmationDialog open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleConfirmDelete} title="Delete Course" message={`Are you sure you want to delete "${courseToDelete.name}"?`} />}
      <Dialog open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Filter Courses</DialogTitle>
        <DialogContent><Stack spacing={2} sx={{pt: 1}}><FormControl size="small"><InputLabel>Teacher</InputLabel><Select value={teacherFilter} label="Teacher" onChange={(e) => setTeacherFilter(e.target.value)}>{/* ... */}</Select></FormControl><FormControl size="small"><InputLabel>Semester</InputLabel><Select value={semesterFilter} label="Semester" onChange={(e) => setSemesterFilter(e.target.value)}>{/* ... */}</Select></FormControl></Stack></DialogContent>
        <DialogActions><Button onClick={() => {setTeacherFilter('all'); setSemesterFilter('all'); setFilterDialogOpen(false);}}>Clear</Button><Button variant="contained" onClick={() => setFilterDialogOpen(false)}>Apply</Button></DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminCourseManagement;