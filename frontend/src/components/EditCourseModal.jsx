import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
} from '@mui/material';

const EditCourseModal = ({ open, handleClose, refreshCourses, course }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [semester, setSemester] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch teachers for the dropdown
  useEffect(() => {
    if (open) {
      const fetchTeachers = async () => {
        try {
          const response = await api.get('/users?role=teacher');
          setTeachers(response.data);
        } catch (err) {
          console.error("Failed to fetch teachers", err);
        }
      };
      fetchTeachers();
    }
  }, [open]);

  // Pre-populate form with course data
  useEffect(() => {
    if (course) {
      setName(course.name || '');
      setDescription(course.description || '');
      setSemester(course.semester || '');
      // Ensure teacherId is not null before accessing _id
      setTeacherId(course.teacherId?._id || '');
    }
  }, [course]);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await api.put(`/courses/${course._id}`, { name, description, semester, teacherId });
      refreshCourses();
      handleClose();
    } catch (err) {
      setError('Failed to update course.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Course: {course?.name}</DialogTitle>
      <DialogContent>
        {error && <Typography color="error" gutterBottom>{error}</Typography>}
        <TextField
          autoFocus
          margin="dense"
          label="Course Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Semester"
          type="text"
          fullWidth
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Assign Teacher</InputLabel>
          <Select
            value={teacherId}
            label="Assign Teacher"
            onChange={(e) => setTeacherId(e.target.value)}
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher._id} value={teacher._id}>
                {teacher.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCourseModal;