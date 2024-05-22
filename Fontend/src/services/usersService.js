import axios from "../utils/axiosCustomize";

const PutUpdateInfoUser = (options = {}) => {
    return axios.put('update-info', options); 
};

const PostSendHelpRequest = (userID, title, data) => {
    return axios.post('sendHelpRequest', {userID, title, data})
};

const PostChangePassword = (email, oldPassword, newPassword) => {
    return axios.post('changePassword', {email, oldPassword, newPassword});
};

const GetHelpByUser = (userID) => {
    return axios.get(`getHelpByUser/${userID}`);
};

const DeleteHelp = (HelpID) => {
    return axios.delete(`deleteHelpRequest/${HelpID}`);
};

export {PutUpdateInfoUser, PostSendHelpRequest, PostChangePassword, GetHelpByUser, DeleteHelp}
