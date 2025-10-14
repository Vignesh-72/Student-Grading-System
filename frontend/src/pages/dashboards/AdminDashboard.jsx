import React, { useEffect, useState } from 'react';
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
  Button, 
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import CreateUserModal from '../../components/CreateUserModal';
import EditUserModal from '../../components/EditUserModal';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AdminCourseManagement from './AdminCourseManagement';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  // This useEffect hook implements your idea.
  // It re-runs the fetchUsers function every time 'filterRole' changes.
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const url = filterRole === 'all' ? '/users' : `/users?role=${filterRole}`;
        console.log(`filter ${filterRole}`);
        
        const response = await api.get(url);
        setUsers(response.data);
        console.log(response.data);
        
      } catch (err) {
        setError('Failed to fetch users.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [filterRole]);

  const fetchUsersWithoutLoading = async () => {
    try {
      const url = filterRole === 'all' ? '/users' : `/users?role=${filterRole}`;
      const response = await api.get(url);
      setUsers(response.data);
    } catch (err) {
      setError('Failed to refresh users.');
    }
  };

  const handleEditClick = (user) => {
    setUserToEdit(user);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setUserToEdit(null);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await api.delete(`/users/${userToDelete._id}`);
      fetchUsersWithoutLoading();
    } catch (err) {
      setError('Failed to delete user.');
      console.error(err);
    } finally {
      setConfirmDialogOpen(false);
      setUserToDelete(null);
    }
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <Box mb={4}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" gutterBottom>User Management</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Filter by Role</InputLabel>
              <Select
                value={filterRole}
                label="Filter by Role"
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="student">Students</MenuItem>
                <MenuItem value="teacher">Teachers</MenuItem>
                <MenuItem value="admin">Admins</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={() => setCreateModalOpen(true)}>
              Create New User
            </Button>
          </Box>
        </Box>
        {loading ? <CircularProgress /> : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleEditClick(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteClick(user)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <AdminCourseManagement />

      <CreateUserModal 
        open={createModalOpen} 
        handleClose={() => setCreateModalOpen(false)} 
        refreshUsers={fetchUsersWithoutLoading} 
      />

      {userToEdit && (
        <EditUserModal 
          open={editModalOpen}
          handleClose={handleCloseEditModal}
          refreshUsers={fetchUsersWithoutLoading}
          user={userToEdit}
        />
      )}

      {userToDelete && (
        <ConfirmationDialog
          open={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete User"
          message={`Are you sure you want to delete the user "${userToDelete.name}"? This action cannot be undone.`}
        />
      )}
    </Box>
  );
};

export default AdminDashboard;