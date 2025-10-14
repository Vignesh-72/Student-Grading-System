import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Typography,
} from '@mui/material';

const AddGradeModal = ({ open, handleClose, courseId }) => {
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [marks, setMarks] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open && courseId) {
      const fetchStudents = async () => {
        try {
          const response = await api.get(`/courses/${courseId}`);
          setEnrolledStudents(response.data.enrolledStudents);
        } catch (err) {
          setError('Failed to load students.');
        }
      };
      fetchStudents();
    }
  }, [open, courseId]);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await api.post('/grades', {
        studentId: selectedStudent,
        courseId: courseId,
        marks: Number(marks),
        comments,
      });
      handleClose(true); // Close modal and indicate success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add grade.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => handleClose(false)}>
      <DialogTitle>Add New Grade</DialogTitle>
      <DialogContent>
        {error && <Typography color="error">{error}</Typography>}
        <FormControl fullWidth margin="normal">
          <InputLabel>Student</InputLabel>
          <Select
            value={selectedStudent}
            label="Student"
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            {enrolledStudents.map((student) => (
              <MenuItem key={student._id} value={student._id}>
                {student.name} ({student.email})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          label="Marks (0-100)"
          type="number"
          fullWidth
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />
        <TextField
          margin="normal"
          label="Comments"
          type="text"
          fullWidth
          multiline
          rows={3}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddGradeModal;