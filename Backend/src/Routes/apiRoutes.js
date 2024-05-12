import express from 'express';
import {
    apiLoginController,
    apiRegisterController,
    apiUpdateInfoController,
    apiSendHelpRequestController,
    apiChangePasswordController,
    apiGetAllHelpRequestController,
    apiGetHelpRequestByIdController,
    apiSolveHelpRequestController,
    apiGetAllUsersController,
    apiGetUserByIdController,
    apiDeleteUserController,
    apiResetPasswordController,
    apiConfirmPaymentController,
    apiSearchByEmailController,
    apiDownloadListUserController,
    apiUpdateUserByAdminController,
    apiGetUnpaidTeamsController,
    apiGetUnSolvedRequestsController,
    apiGetHasNotUpdatedInfoController
} from '../controllers/apiController';
import { permissionMiddleware } from '../controllers/JWTActions';
const apiRoute = express.Router();



const initApiRoutes = (app) => {
    apiRoute.all('*', permissionMiddleware); //all routes
    apiRoute.post('/register', apiRegisterController);
    apiRoute.post('/login', apiLoginController);

    //user routes
    // apiRoute.post('/forgot-password', apiController);
    apiRoute.put('/update-info', apiUpdateInfoController);
    apiRoute.post('/sendHelpRequest', apiSendHelpRequestController);
    apiRoute.post('/changePassword', apiChangePasswordController);
    //admin routes
    apiRoute.put('/resetPassword/:id', apiResetPasswordController); //reset password
    apiRoute.put('/updateInfo', apiUpdateUserByAdminController); //update user info
    apiRoute.get('/getAllHelpRequest', apiGetAllHelpRequestController); //get all help request with pagination
    apiRoute.get('/getHelpRequestById/:id', apiGetHelpRequestByIdController); //get help request by id
    apiRoute.put('/solveHelpRequest', apiSolveHelpRequestController); //solve help request

    apiRoute.get('/getAllUsers', apiGetAllUsersController); //get all user with pagination
    apiRoute.get('/getUserById/:id', apiGetUserByIdController); //get user by id
    apiRoute.delete('/deleteUser/:id', apiDeleteUserController); //delete user

    apiRoute.put('/confirmPayment/:id', apiConfirmPaymentController); //confirm payment

    apiRoute.post('/searchByEmail', apiSearchByEmailController); //search user by email
    apiRoute.get('/getUnPaid', apiGetUnpaidTeamsController); //filter user unpaid
    apiRoute.get('/getUnSolved', apiGetUnSolvedRequestsController); //filter request unsolved
    apiRoute.get('/getHasNotUpdate', apiGetHasNotUpdatedInfoController); //filter user updated info
    apiRoute.get('/downloadListUser', apiDownloadListUserController); //download list user

    app.use('/api/v1', apiRoute);
};

export default initApiRoutes;