import express from 'express';
import {
    apiLoginController,
    apiRegisterController,
    apiUpdateInfoController,
    apiSendHelpRequestController,
    apiChangePasswordController
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
    // apiRoute.put('/resetPassword', apiController); //reset password
    // apiRoute.put('/updateInfo', apiController); //update user info
    // apiRoute.get('/getAllHelpRequest', apiController); //get all help request with pagination
    // apiRoute.get('/getHelpRequestById/:id', apiController); //get help request by id
    // apiRoute.put('/solveHelpRequest/:id', apiController); //solve help request

    // apiRoute.get('/getAllUser', apiController); //get all user with pagination
    // apiRoute.get('/getUserById/:id', apiController); //get user by id
    // apiRoute.delete('/deleteUser/:id', apiController); //delete user

    // apiRoute.put('/confirmPayment', apiController); //confirm payment

    // apiRoute.post('/searchByEmail', apiController); //search user by email
    // apiRoute.get('/filterUnPaid', apiController); //filter user unpaid
    // apiRoute.get('/filterPaid', apiController); //filter user paid
    // apiRoute.get('/filterSolved', apiController); //filter request solved
    // apiRoute.get('/filterUnSolved', apiController); //filter request unsolved
    // apiRoute.get('/filterIsUpdate', apiController); //filter user updated info


    app.use('/api/v1', apiRoute);
};

export default initApiRoutes;