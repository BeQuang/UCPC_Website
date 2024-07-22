import axios from "../../utils/axiosCustomize";

const GetAllUsers = (page = null, limit = null) => {
    let url = 'getAllUsers';
    if (page !== null && limit !== null) {
        url += `?page=${page}&limit=${limit}`;
    }
    return axios.get(url);
};

const GetUserByID = (userID) => {
    return axios.get(`getUserById/${userID}`)
};

const DeleteUserByID = (userID) => {
    return axios.delete(`deleteUser/${userID}`)
};

const UpdateInfoByAdmin = (data) => {
    return axios.put('updateInfo', data);
};

const PutResetPassword = (userID) => {
    return axios.put(`resetPassword/${userID}`)
};

const PutConfirmPayment = (userID) => {
    return axios.put(`confirmPayment/${userID}`);
};
export {GetAllUsers, GetUserByID, DeleteUserByID, UpdateInfoByAdmin, PutResetPassword, PutConfirmPayment}