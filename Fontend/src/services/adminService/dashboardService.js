import axios from "../../utils/axiosCustomize";

const GetDashBoard = () => {
    return axios.get('getDashboard');
}

const GetHasNotUpdateTeam = () => {
    return axios.get('getHasNotUpdate');
}

const GetUnpaidTeams = () => {
    return axios.get('getUnPaid');
}

const GetUnsolvedRequest = () => {
    return axios.get('getUnSolved');
}

const DownloadListUsers = () => {
    return axios.get('downloadListUser');
}

const searchByEmail = (email) => {
    return axios.post('searchByEmail', {email})
}

export {GetDashBoard, GetHasNotUpdateTeam, GetUnpaidTeams, GetUnsolvedRequest, DownloadListUsers, searchByEmail};