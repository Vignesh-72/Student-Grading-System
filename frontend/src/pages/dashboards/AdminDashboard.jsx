import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  CircularProgress, Button, IconButton, FormControl, InputLabel, Select, MenuItem, useTheme,
  useMediaQuery, Card, CardContent, Stack, Chip, Dialog, DialogActions, DialogContent,
  DialogTitle, Tooltip, AppBar, Tabs, Tab
} from '@mui/material';
import CreateUserModal from '../../components/CreateUserModal';
import EditUserModal from '../../components/EditUserModal';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import FilterListIcon from '@mui/icons-material/FilterList';
import AdminCourseManagement from './AdminCourseManagement';

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [activeTab, setActiveTab] = useState(0);

  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [confirmUserDialogOpen, setConfirmUserDialogOpen] = useState(false);
  const [filterUserDialogOpen, setFilterUserDialogOpen] = useState(false);
  
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const url = filterRole === 'all' ? '/users' : `/users?role=${filterRole}`;
        const response = await api.get(url);
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users.');
        console.error(err);
      } finally {
        setLoadingUsers(false);
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

  const handleEditUserClick = (user) => {
    setUserToEdit(user);
    setEditUserModalOpen(true);
  };

  const handleCloseEditUserModal = () => {
    setEditUserModalOpen(false);
    setUserToEdit(null);
  };

  const handleDeleteUserClick = (user) => {
    setUserToDelete(user);
    setConfirmUserDialogOpen(true);
  };

  const handleConfirmUserDelete = async () => {
    if (!userToDelete) return;
    try {
      await api.delete(`/users/${userToDelete._id}`);
      fetchUsersWithoutLoading();
    } catch (err) {
      setError('Failed to delete user.');
    } finally {
      setConfirmUserDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const MobileUserCard = ({ user }) => (
    <Card sx={{ mb: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: 2 }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="subtitle2" fontWeight="600">{user.name}</Typography>
            <Chip
              label={user.role}
              size="small"
              color={user.role === 'admin' ? 'error' : user.role === 'teacher' ? 'primary' : 'default'}
              sx={{ fontSize: '0.7rem', height: 20 }}
            />
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ wordBreak: 'break-all' }}>{user.email}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5, mt: 0.5 }}>
            <Tooltip title="Edit"><IconButton size="small" color="primary" onClick={() => handleEditUserClick(user)} sx={{ p: '4px' }}><EditIcon fontSize="small" /></IconButton></Tooltip>
            <Tooltip title="Delete"><IconButton size="small" color="error" onClick={() => handleDeleteUserClick(user)} sx={{ p: '4px' }}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      {isMobile && (
        <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
            <Tab icon={<PeopleIcon />} label="Users" sx={{ minHeight: 48, fontSize: '0.7rem' }} />
            <Tab icon={<SchoolIcon />} label="Courses" sx={{ minHeight: 48, fontSize: '0.7rem' }} />
          </Tabs>
        </AppBar>
      )}

      <Box sx={{ flexGrow: 1, overflow: 'auto', p: isMobile ? 2 : 3 }}>
        {(isMobile ? activeTab === 0 : true) && (
          <Box id="user-management" sx={{ mb: 4, display: isMobile && activeTab !== 0 ? 'none' : 'block' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ m: 0, alignSelf: isMobile ? 'flex-start' : 'center' }}>User Management</Typography>
              <Box sx={{ display: 'flex', gap: 2, width: isMobile ? '100%' : 'auto', flexDirection: isSmallMobile ? 'column' : 'row' }}>
                {isMobile ? (
                  <Button variant="outlined" size="small" startIcon={<FilterListIcon />} onClick={() => setFilterUserDialogOpen(true)}>Filter Users</Button>
                ) : (
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Filter Role</InputLabel>
                    <Select value={filterRole} label="Filter Role" onChange={(e) => setFilterRole(e.target.value)}>
                      <MenuItem value="all">All Roles</MenuItem>
                      <MenuItem value="student">Students</MenuItem>
                      <MenuItem value="teacher">Teachers</MenuItem>
                      <MenuItem value="admin">Admins</MenuItem>
                    </Select>
                  </FormControl>
                )}
                <Button variant="contained" size="small" onClick={() => setCreateUserModalOpen(true)}>Create User</Button>
              </Box>
            </Box>
            {loadingUsers ? <CircularProgress /> : (
              isMobile ? (
                <Box>{users.map(user => <MobileUserCard key={user._id} user={user} />)}</Box>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead><TableRow><TableCell>Name</TableCell><TableCell>Email</TableCell><TableCell>Role</TableCell><TableCell align="right">Actions</TableCell></TableRow></TableHead>
                    <TableBody sx={{ '& .MuiTableRow-root:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }}>
                      {users.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell align="right">
                            <IconButton color="primary" onClick={() => handleEditUserClick(user)}><EditIcon /></IconButton>
                            <IconButton color="error" onClick={() => handleDeleteUserClick(user)}><DeleteIcon /></IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )
            )}
          </Box>
        )}

        {(isMobile ? activeTab === 1 : true) && (
          <Box id="course-management" sx={{ display: isMobile && activeTab !== 1 ? 'none' : 'block' }}>
            <AdminCourseManagement />
          </Box>
        )}
      </Box>

      {/* Modals and Dialogs */}
      <CreateUserModal open={createUserModalOpen} handleClose={() => setCreateUserModalOpen(false)} refreshUsers={fetchUsersWithoutLoading} />
      {userToEdit && <EditUserModal open={editUserModalOpen} handleClose={handleCloseEditUserModal} refreshUsers={fetchUsersWithoutLoading} user={userToEdit} />}
      {userToDelete && <ConfirmationDialog open={confirmUserDialogOpen} onClose={() => setConfirmUserDialogOpen(false)} onConfirm={handleConfirmUserDelete} title="Delete User" message={`Are you sure you want to delete "${userToDelete.name}"?`} />}
      <Dialog open={filterUserDialogOpen} onClose={() => setFilterUserDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Filter Users</DialogTitle>
        <DialogContent><FormControl fullWidth size="small" sx={{mt: 1}}><InputLabel>Role</InputLabel><Select value={filterRole} label="Role" onChange={(e) => setFilterRole(e.target.value)}>{/* ... */}</Select></FormControl></DialogContent>
        <DialogActions><Button onClick={() => setFilterUserDialogOpen(false)}>Apply</Button></DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;