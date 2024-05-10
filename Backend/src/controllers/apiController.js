import {
    apiLoginService,
    apiRegisterService,
    apiUpdateInfoService,
    apiSendHelpRequestService,
    apiChangePasswordService
} from '../services/apiService';

const apiLoginController = async (req, res) => {
    try {
        let result = await apiLoginService(req.body.email, req.body.password);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });

    } catch (error) {
        return res.status(200).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }
}

const apiRegisterController = async (req, res) => {
    try {
        let result = await apiRegisterService(req.body.email, req.body.password, req.body.username);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });
    } catch (error) {
        return res.status(200).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }
}

const apiUpdateInfoController = async (req, res) => {
    try {
        let result = await apiUpdateInfoService(req.body);
        if (result.EC !== 0) {
            return res.status(200).json({
                EM: result.EM,
                EC: result.EC,
                DT: result.DT
            });
        }
        else {
            return res.status(200).json({
                EM: result.EM,
                EC: result.EC,
                DT: result.DT
            });
        }
    } catch (error) {
        return res.status(200).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }

}

const apiSendHelpRequestController = async (req, res) => {
    try {
        let userId = req.body.userId;
        let title = req.body.title;
        let data = req.body.data;
        let result = await apiSendHelpRequestService(userId, title, data);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });
    } catch (error) {
        return res.status(200).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }

}

const apiChangePasswordController = async (req, res) => {
    try {
        let result = await apiChangePasswordService(req.body.email, req.body.password, req.body.newPassword);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });
    } catch (error) {
        return res.status(200).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }
}

export {
    apiLoginController,
    apiRegisterController,
    apiUpdateInfoController,
    apiSendHelpRequestController,
    apiChangePasswordController
}