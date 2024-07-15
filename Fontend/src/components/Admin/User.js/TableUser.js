import React, { useState } from 'react';
import {
    Box,
    Table,
    TablePagination,
    Tooltip,
    Paper,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
    TableRow,
    IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import ConfirmDeleteUser from './ConfirmDeleteUser';
import Popup from './Popup';
import FormUpdateUser from './FormUpdateUser';
import SearchUserByEmail from '../DashBoard/SearchByEmail';
// import ResetPassword from './ResetPassword'; // Import ResetPassword component

const columns = [
    { id: 'id', label: 'ID' },
    { id: 'email', label: 'Email' },
    { id: 'username', label: 'UserName' },
    { id: 'role', label: 'Role' },
    { id: 'teamName', label: 'Team Name' },
];

const mockUserData = [
    { id: 1, email: 'user1@example.com', username: 'user1', role: 'admin', teamName: 'Team A' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    { id: 2, email: 'user2@example.com', username: 'user2', role: 'member', teamName: 'Team B' },
    // Add more mock data here...
];

const TableUsers = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dataUserDelete, setDataUserDelete] = useState();
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({});

    const handleDelete = (userId) => {
        setDataUserDelete(userId);
        setOpenDelete(true);
    };

    const handleEdit = (row) => {
        setEditMode(true);
        setEditData(row);
    };

    const handleCloseEdit = () => {
        setEditMode(false);
        setEditData({});
    };

    const handleSaveEdit = () => {
        // Logic to save edited data
        console.log('Edited Data:', editData);
        setEditMode(false);
        // Update your mock data or make API calls here
    };

    const handleAction = (actionType) => {
        if (actionType === 'edit') {
            handleSaveEdit();
        } else if (actionType === 'delete') {
            // Logic to delete user
            console.log('Deleting user with ID:', dataUserDelete);
            setOpenDelete(false);
            // Perform delete operation (could update mockUserData state or make API call)
        }
    };

    const handleResetPassword = (userId) => {
        // Logic to reset password
        console.log('Resetting password for user ID:', userId);
        // Implement your password reset functionality here
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleInputChange = (e, columnId) => {
        setEditData({ ...editData, [columnId]: e.target.value });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <SearchUserByEmail />
            <Box sx={{ flex: '1 1 auto' }}>
                <Box sx={{ maxHeight: '580px', overflow: 'auto' }}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">#</TableCell>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align="center">
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mockUserData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => (
                                        <TableRow key={row.id}>
                                            <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                            {columns.map((column) => (
                                                <TableCell key={column.id} align="center">
                                                    {row[column.id]}
                                                </TableCell>
                                            ))}
                                            <TableCell>
                                                <Box display="flex" justifyContent="center">
                                                    <Tooltip title="Edit User" arrow placement="top">
                                                        <IconButton color="primary" onClick={() => handleEdit(row)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Reset Password" arrow placement="top">
                                                        <IconButton
                                                            color="default"
                                                            onClick={() => handleResetPassword(row.id)}
                                                        >
                                                            <LockIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete User" arrow placement="top">
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => handleDelete(row.id)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'right',
                height: 'auto', // Chiều cao của Box để căn giữa nội dung
                '& .MuiTablePagination-root': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                    margin: 0,
                }
            }}>
                <TablePagination
                    component="div"
                    count={mockUserData.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                />
            </Box>

            <Popup
                title="Edit User"
                openPopup={editMode}
                setOpenPopup={setEditMode}
                handleAction={handleAction}
                actionType="edit"
            >
                <FormUpdateUser initialValues={editData} handleInputChange={handleInputChange} />
            </Popup>
            <Popup
                title="Confirm Delete"
                openPopup={openDelete}
                setOpenPopup={setOpenDelete}
                handleAction={handleAction}
                actionType="delete"
            >
                <ConfirmDeleteUser
                    userId={dataUserDelete}
                    onConfirm={() => {
                        // Logic to delete user
                        setOpenDelete(false);
                    }}
                />
            </Popup>
        </Box>
    );
};

export default TableUsers;
