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

const UpdateInfoByAdmin = (options = {}) => {
    return axios.put('updateInfo', options);
        //Example options
        // options = {
        //     {
        //         "key": "userId",
        //         "value": "2",
        //         "type": "text"
        //     },
        //     {
        //         "key": "teamName",
        //         "value": "Test Team 2",
        //         "type": "text"
        //     },
        //     {
        //         "key": "isHighSchool",
        //         "value": "false",
        //         "type": "text"
        //     },
        //     {
        //         "key": "Participants[0][fullName]",
        //         "value": "team2 member 1",
        //         "type": "text"
        //     },
        //     {
        //         "key": "Participants[1][fullName]",
        //         "value": "team2 member 2",
        //         "type": "text"
        //     },
        //     {
        //         "key": "Participants[2][fullName]",
        //         "value": "team2 member 3",
        //         "type": "text"
        //     },
        //     {
        //         "key": "Participants[0][citizenId]",
        //         "value": "012301230123",
        //         "type": "text"
        //     },
        //     {
        //         "key": "Participants[1][citizenId]",
        //         "value": "012301230123",
        //         "type": "text"
        //     },
        //     {
        //         "key": "Participants[2][citizenId]",
        //         "value": "012301230123",
        //         "type": "text"
        //     },
        //     {
        //         "key": "Participants[0][birth]",
        //         "value": "01/07/2002",
        //         "type": "text"
        //     },
        //     {
        //         "key": "Participants[1][birth]",
        //         "value": "23/06/2004",
        //         "type": "text"
        //     },
        //     {
        //         "key": "Participants[2][birth]",
        //         "value": "01/01/2002",
        //         "type": "text"
        //     },
        //     {
        //         "key": "Participants[0][phone]",
        //         "value": "0123123123",
        //         "type": "text"
        //     },
        //     {
        //         "key": "Participants[1][phone]",
        //         "value": "0456456456",
        //         "type": "text"
        //     },
        //     {
        //         "key": "Participants[2][phone]",
        //         "value": "0789789789",
        //         "type": "text"
        //     },
        //     {
        //         "key": "Participants[0][schoolName]",
        //         "value": "THPT A",
        //         "type": "text"
        //     },
        //     {
        //         "key": "Participants[1][schoolName]",
        //         "value": "THPT B",
        //         "type": "text"
        //     },
        //     {
        //         "key": "Participants[2][schoolName]",
        //         "value": "THPT C",
        //         "type": "text"
        //     }}
};

const PutResetPassword = (userID) => {
    return axios.put(`resetPassword/${userID}`)
};

const PutConfirmPayment = (userID) => {
    return axios.put(`confirmPayment/${userID}`);
};
export {GetAllUsers, GetUserByID, DeleteUserByID, UpdateInfoByAdmin, PutResetPassword, PutConfirmPayment}