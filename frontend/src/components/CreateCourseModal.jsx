import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const CreateCourseModal = ({ open, handleClose, refreshCourses }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [semester, setSemester] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      // Reset form fields when modal opens
      setName('');
      setDescription('');
      setSemester('');
      setTeacherId('');
      setError('');
      
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

  const handleSubmit = async () => {
    if (!teacherId) {
      setError('You must select a teacher.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post('/courses', { name, description, semester, teacherId });
      refreshCourses();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Course</DialogTitle>
      <DialogContent>
        {error && <Typography color="error" gutterBottom>{error}</Typography>}
        <TextField autoFocus margin="dense" label="Course Name" type="text" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
        <TextField margin="dense" label="Description" type="text" fullWidth multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
        <TextField margin="dense" label="Semester (e.g., Fall 2025)" type="text" fullWidth value={semester} onChange={(e) => setSemester(e.target.value)} />
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Assign Teacher</InputLabel>
          <Select value={teacherId} label="Assign Teacher" onChange={(e) => setTeacherId(e.target.value)}>
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
          {loading ? <CircularProgress size={24} /> : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCourseModal;