import React, { useEffect, useState } from 'react';
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
import Popup from './Popup';
import FormUpdateUser from './FormUpdateUser';
import { DeleteUserByID, GetAllUsers, GetUserByID, PutResetPassword, UpdateInfoByAdmin } from '~/services/adminService/userService';
import { searchByEmail } from '~/services/adminService/dashboardService';

const columns = [
    { id: 'id', label: 'ID' },
    { id: 'email', label: 'Email' },
    { id: 'username', label: 'UserName' },
    { id: 'role', label: 'Role' },
    { id: 'teamName', label: 'Team Name' },
];



const TableUsers = () => {
    const [data, setData] = useState([]);
    const [email, setEmail] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Open popup
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openReset, setOpenReset] = useState(false)

    // Data truyền vào popup
    const [editData, setEditData] = useState();

    const [dataUserReset, setDataUserReset] = useState();
    const [dataUserDelete, setDataUserDelete] = useState();

    const fetchData = async () => {
        try {
            const response = await GetAllUsers();
            console.log("check fetch all users", response);
            if (response.EC === 0)
                setData(response.DT.rows);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    
    const handleOpenEdit = async (userID) => {    
        const response = await GetUserByID(userID);
        console.log("check get User by ID" , response);
        if(response.EC === 0){
            setEditData(response.DT);  
            setOpenEdit(true);
        }
    };

    const handleOpenResetPassword = (userId) => {
        setDataUserReset(userId)
        setOpenReset(true);
    };

    const handleOpenDelete = (userId) => {
        setDataUserDelete(userId);
        setOpenDelete(true);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await UpdateInfoByAdmin({
                userId: editData.id,
                teamName: editData.teamName,
                paidImage: editData.paidImage,
                isHighSchool: editData.isHighSchool,
                trainerName: editData.trainerName,
                Participants: editData.Participants
            });
    
            console.log('Response from API:', response);
    
            if (response.EC === 0) { // Kiểm tra phản hồi từ server
                alert('Success');
            } else {
                alert('Failed!');
            }
        } catch (error) {
            console.error('Error while saving edit:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setOpenEdit(false);
            fetchData();
        }
    };
    

    const handleResetPassword = async (userID) => {
        //call api to reset password by UserID

        const response = await PutResetPassword(userID);

        if (response.EC === 0){
            alert('Success')
        }
        else{
            alert('Failed')
        }
        setOpenReset(false)
    }

    const handleDeleteUser = async (userID) => {
        // call api to delete user by UserID
        const response = await DeleteUserByID(userID)
        if (response.EC === 0){
            alert('Success')
        }
        else{
            alert('Failed')
        }
        setOpenDelete(false)
        fetchData()
    }

    const handleAction = (actionType) => {
        if (actionType === 'edit') {
            handleSaveEdit();
        } else if (actionType === 'delete') {
            handleDeleteUser(dataUserDelete)
        }
        else{   
            handleResetPassword(dataUserReset)
        }
    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDataEdit = (newData) => {
        setEditData(newData);
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await searchByEmail(email);
            if (response.EC === 0) {
                setData(response.DT.rows);
            } else {
                setData([]);
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingRight: '15px' }}>
            <div style={{ height: '4vh' }} />
            <Box sx={{ border: '2px solid #000', padding: '10px', borderRadius: '10px', marginBottom: '10px' }}>
                <form onSubmit={handleSearch} className="d-flex align-items-center">
                    <input
                        type="text"
                        className="form-control form-control-lg" // Use form-control-lg for larger input size
                        placeholder="Enter email to search"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ fontSize: '1rem'}}
                    />
                    <button type="submit" className="btn btn-primary ml-2 mx-3 " style={{ fontSize: '1rem'}}>Search</button>
                </form>
            </Box>
            <Box sx={{ flex: '1 1 auto', border: '2px solid #000', padding: '10px', borderRadius: '10px', maxHeight: '78vh', overflow: 'auto' }}>
                <TableContainer component={Paper} sx={{ maxHeight: '74.5vh' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align="center">
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} align="center">
                                                {row[column.id]}
                                            </TableCell>
                                        ))}
                                        { data[index].id !== 1 && 
                                            <TableCell>
                                            <Box display="flex" justifyContent="center">
                                                <Tooltip title="Edit User" arrow placement="top">
                                                    <IconButton color="primary" onClick={() => handleOpenEdit(row.id)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Reset Password" arrow placement="top">
                                                    <IconButton
                                                        color="default"
                                                        onClick={() => handleOpenResetPassword(row.id)}
                                                    >
                                                        <LockIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete User" arrow placement="top">
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleOpenDelete(row.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                            </TableCell>
                                        }
                                        
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
                    count={data.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 15]}
                />
            </Box>

            <Popup
                title="Cập nhật đội thi UCPC"
                openPopup={openEdit}
                setOpenPopup={setOpenEdit}
                handleAction={handleAction}
                actionType="edit"
            >
                <FormUpdateUser
                    editData={editData}                    
                    handleChangeDataEdit={handleChangeDataEdit}
                />
            </Popup>
            <Popup
                title=""
                openPopup={openDelete}
                setOpenPopup={setOpenDelete}
                handleAction={handleAction}
                actionType="delete"
            >
            <h5 className="card-title display-7">Are you sure you want to delete user with ID: {dataUserDelete}?</h5>
            </Popup>
            <Popup
                title=""
                openPopup={openReset}
                setOpenPopup={setOpenReset}
                handleAction={handleAction}
                actionType="reset"
            >
            <h5 className="card-title display-7">Are you sure you want to reset password with ID: {dataUserReset}?</h5>
            </Popup>
        </Box>
    );
};

export default TableUsers;
