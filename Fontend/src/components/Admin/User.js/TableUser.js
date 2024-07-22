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
import SearchUserByEmail from '../DashBoard/SearchByEmail';
import { DeleteUserByID, GetAllUsers, GetUserByID, PutResetPassword, UpdateInfoByAdmin } from '~/services/adminService/userService';

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
    { id: 3, email: 'user3@example.com', username: 'user3', role: 'member', teamName: 'Team A' },
    { id: 4, email: 'user4@example.com', username: 'user4', role: 'member', teamName: 'Team B' },
    { id: 5, email: 'user5@example.com', username: 'user5', role: 'member', teamName: 'Team A' },
    { id: 6, email: 'user6@example.com', username: 'user6', role: 'member', teamName: 'Team B' },
    { id: 7, email: 'user7@example.com', username: 'user7', role: 'member', teamName: 'Team A' },
    { id: 8, email: 'user8@example.com', username: 'user8', role: 'member', teamName: 'Team B' },
    { id: 9, email: 'user9@example.com', username: 'user9', role: 'member', teamName: 'Team A' },
    { id: 10, email: 'user10@example.com', username: 'user10', role: 'member', teamName: 'Team B' },
    { id: 11, email: 'user11@example.com', username: 'user11', role: 'member', teamName: 'Team A' },
    { id: 12, email: 'user12@example.com', username: 'user12', role: 'member', teamName: 'Team B' },
    { id: 13, email: 'user13@example.com', username: 'user13', role: 'member', teamName: 'Team A' },
    { id: 14, email: 'user14@example.com', username: 'user14', role: 'member', teamName: 'Team B' },
    { id: 15, email: 'user15@example.com', username: 'user15', role: 'member', teamName: 'Team A' },
    { id: 16, email: 'user16@example.com', username: 'user16', role: 'member', teamName: 'Team B' },
    { id: 17, email: 'user17@example.com', username: 'user17', role: 'member', teamName: 'Team A' },
    { id: 18, email: 'user18@example.com', username: 'user18', role: 'member', teamName: 'Team B' },
    { id: 19, email: 'user19@example.com', username: 'user19', role: 'member', teamName: 'Team A' },
    { id: 20, email: 'user20@example.com', username: 'user20', role: 'member', teamName: 'Team B' },
    { id: 21, email: 'user21@example.com', username: 'user21', role: 'member', teamName: 'Team A' },
    { id: 22, email: 'user22@example.com', username: 'user22', role: 'member', teamName: 'Team B' },
    // Add more mock data here...
];

let dataUserUpdateTets = {
      teamName: 'Team01',
      paidImage: 'a.jpg',
      isHighSchool: 'true',
      trainerName: 'Than',
      Participants: [
        { fullName: 'A', citizenId: '001', phone: '0354463771', birth: '17/07/2004', schoolName: 'TT' },
        { fullName: 'B', citizenId: '002', phone: '0354463771', birth: '17/07/2004', schoolName: 'TT' },
        { fullName: 'C', citizenId: '003', phone: '0354463771', birth: '17/07/2004', schoolName: 'TT' },
      ],
    }


const TableUsers = () => {
    const [data, setData] = useState([]);

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
            // Gọi API để chỉnh sửa user dựa trên userID
            // console.log("Save Edit", editData);
            // console.log(editData.Participants)
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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingRight: '15px' }}>
            <div style={{ height: '4vh' }} />
            <Box sx={{ border: '2px solid #000', padding: '10px', borderRadius: '10px', marginBottom: '10px' }}>
                <SearchUserByEmail />
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
                    count={mockUserData.length}
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
