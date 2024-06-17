import axios from "../../utils/axiosCustomize";

const GetAllHelpRequest = (page = null, limit = null) => {
    let url = 'getAllHelpRequest';
    if (page !== null && limit !== null) {
        url += `?page=${page}&limit=${limit}`;
    }
    return axios.get(url);
};

const GetHelpRequestByID = (HelpID) => {
    return axios.delete(`getHelpRequestById/${HelpID}`);
}

const PUTSolveHelpRequest = (requestID, response) => {
    return axios.put('solveHelpRequest', {requestID, response});
}
export {GetAllHelpRequest, GetHelpRequestByID, PUTSolveHelpRequest}