import axios from "../utils/axiosCustomize";

const PostForgotPassword = (email) => {
    return axios.post('forgot-password', {email});
}   

const PutResetPasswordByUser = (email, pin, newPassword) => {
    return axios.put('resetPasswordByUser', {email, pin, newPassword})
}

export {PostForgotPassword, PutResetPasswordByUser};