import React, { useState } from 'react';
import {
    Box, Table, Button, TablePagination, Tooltip, Paper, TableBody,
    TableCell, TableHead, TableContainer, TableRow, TextField, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Popup from './Popup';
import ConfirmDeleteUser from './ConfirmDeleteUser';

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
    // Add more mock data here...
];

const TableUsers = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dataUserDelete, setDataUserDelete] = useState();
    const [editMode, setEditMode] = useState(null);
    const [editData, setEditData] = useState({});

    const handleDelete = (userId) => {
        setDataUserDelete(userId);
        setOpenDelete(true);
    };

    const handleEdit = (row) => {
        setEditMode(row.id);
        setEditData(row);
    };

    const handleCancelEdit = () => {
        setEditMode(null);
        setEditData({});
    };

    const handleSaveEdit = () => {
        // Logic to save edited data
        console.log('Edited Data:', editData);
        setEditMode(null);
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
        <Box sx={{ minHeight: '500px', width: '100%' }}>
            <TableContainer component={Paper} sx={{ maxHeight: '480px', overflow: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>#</TableCell>
                            {columns.map((column) => (
                                <TableCell key={column.id} align='center'>
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell align='center'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockUserData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell align='center'>{page * rowsPerPage + index + 1}</TableCell>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align='center'>
                                        {editMode === row.id ? (
                                            <TextField
                                                value={editData[column.id]}
                                                onChange={(e) => handleInputChange(e, column.id)}
                                            />
                                        ) : (
                                            row[column.id]
                                        )}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <Box display='flex' justifyContent='center'>
                                        {editMode === row.id ? (
                                            <>
                                                <IconButton onClick={handleSaveEdit} color='primary'>
                                                    <SaveIcon />
                                                </IconButton>
                                                <IconButton onClick={handleCancelEdit} color='secondary'>
                                                    <CancelIcon />
                                                </IconButton>
                                            </>
                                        ) : (
                                            <>
                                                <Tooltip title="Edit User" arrow placement='top'>
                                                    <IconButton
                                                        color='primary'
                                                        onClick={() => handleEdit(row)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete User" arrow placement='top'>
                                                    <IconButton
                                                        color='error'
                                                        onClick={() => handleDelete(row.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </>
                                        )}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={mockUserData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 15, 20]}
            />
            <Popup
                title='Confirm'
                openPopup={openDelete}
                setOpenPopup={setOpenDelete}
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
