import {
    apiLoginService,
    apiRegisterService,
    apiUpdateInfoService,
    apiSendHelpRequestService,
    apiChangePasswordService,
    apiGetAllHelpRequestService,
    apiGetHelpRequestByIdService,
    apiSolveHelpRequestService,
    apiDeleteHelpRequestService,
    apiGetAllUsersService,
    apiGetUserByIdService,
    apiDeleteUserService,
    apiResetPasswordService,
    apiConfirmPaymentService,
    apiSearchByEmailService,
    apiPrepareCSV,
    apiUpdateUserByAdminService,
    apiGetUnpaidTeamsService,
    apiGetUnSolvedRequestsService,
    apiGetHasNotUpdatedInfoService,
    apiForgotPasswordService,
    apiResetPasswordByUserService,
    apiGetDashBoardService,
    apiGetHelpByUserService,
    apiSaveTemplateMailService,
    apiGetTemplateMailService,
    apiSetDefaultTemplateMailService,
    apiGetTypesMailService,
    apiSendMailWithTemplateService,
    apiSendEmailExampleService
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
        return res.status(500).json({
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
        return res.status(500).json({
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
        return res.status(500).json({
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
        return res.status(500).json({
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
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }
}
const apiGetAllHelpRequestController = async (req, res) => {
    try {
        let page = req.query.page;
        let limit = req.query.limit;
        let result = await apiGetAllHelpRequestService(+page, +limit);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });
    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }
}
const apiGetHelpRequestByIdController = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await apiGetHelpRequestByIdService(id);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });
    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }
}
const apiSolveHelpRequestController = async (req, res) => {
    try {
        let id = req.body.requestId;
        let response = req.body.response;
        let result = await apiSolveHelpRequestService(id, response);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });
    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }

}

const apiDeleteHelpRequestController = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await apiDeleteHelpRequestService(id);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });
    }
    catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }

}
const apiGetAllUsersController = async (req, res) => {
    try {
        let [page, limit] = [0, 0];
        if (req.query.page && req.query.limit) {
            page = req.query.page;
            limit = req.query.limit;
        }

        let result = await apiGetAllUsersService(+page, +limit);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });
    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }
}
const apiGetUserByIdController = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await apiGetUserByIdService(id);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });
    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }
}
const apiDeleteUserController = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await apiDeleteUserService(+id);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });
    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }
}
const apiResetPasswordController = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await apiResetPasswordService(+id);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });
    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }

}
const apiConfirmPaymentController = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await apiConfirmPaymentService(+id);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });
    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }
    //apiConfirmPaymentService
}
const apiSearchByEmailController = async (req, res) => {
    try {
        let email = req.body.email;
        let result = await apiSearchByEmailService(email);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });
    }
    catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }
}
const apiDownloadListUserController = async (req, res) => {
    try {
        const csvFilePath = await apiPrepareCSV();
        return res.download(csvFilePath.DT, 'user_data.csv');
    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }
}
const apiUpdateUserByAdminController = async (req, res) => {
    try {
        let result = await apiUpdateUserByAdminService(req.body);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });

    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }
}
const apiGetUnpaidTeamsController = async (req, res) => {
    try {
        let isUpdatedImage = false;

        if (req.query && req.query.isUpdatedImage && req.query.isUpdatedImage === 'true') {
            isUpdatedImage = true;
        }
        let result = await apiGetUnpaidTeamsService(isUpdatedImage);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });

    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }
}
const apiGetUnSolvedRequestsController = async (req, res) => {
    try {
        let result = await apiGetUnSolvedRequestsService();
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });

    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }
}
const apiGetHasNotUpdatedInfoController = async (req, res) => {
    try {
        let result = await apiGetHasNotUpdatedInfoService();
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });

    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }

}
const apiForgotPasswordController = async (req, res) => {
    try {
        let email = req.body.email;
        let result = await apiForgotPasswordService(email);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });

    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }


}
const apiResetPasswordByUserController = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.newPassword;
        let pin = req.body.pin;
        let result = await apiResetPasswordByUserService(email, pin, password);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });

    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });
    }
}
const apiGetDashboardController = async (req, res) => {
    try {
        let result = await apiGetDashBoardService();
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });

    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });

    }
}
const apiGetHelpByUserController = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await apiGetHelpByUserService(id);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });

    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });

    }
}
const apiSaveTemplateMailController = async (req, res) => {
    try {
        let template_name = req.body.templateName;
        let data = req.body.data;
        let result = await apiSaveTemplateMailService(template_name, data);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });

    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });

    }

}
const apiGetTemplateMailController = async (req, res) => {
    try {
        let result = await apiGetTemplateMailService();
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });

    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });

    }


}
const apiSetDefaultTemplateMailController = async (req, res) => {
    try {
        let id_template = req.body.id_template;
        let id_type = req.body.id_type;
        let result = await apiSetDefaultTemplateMailService(id_template, id_type);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });

    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });

    }
}
const apiGetTypesMailController = async (req, res) => {
    try {
        let result = await apiGetTypesMailService();
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });

    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });

    }
}
const apiSendMailWithTemplateController = async (req, res) => {
    try {
        let id_template = req.body.id_template;
        let type = req.body.type;
        let title = req.body.title;
        let result = await apiSendMailWithTemplateService(type, title, id_template);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });

    } catch (error) {
        return res.status(500).json({
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        });

    }
}
const apiSendEmailExampleController = async (req, res) => {
    try {
        let email = req.body.email;
        let id_template = req.body.id_template;
        let result = await apiSendEmailExampleService(email, id_template);
        return res.status(200).json({
            EM: result.EM,
            EC: result.EC,
            DT: result.DT
        });

    } catch (error) {
        return res.status(500).json({
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
    apiChangePasswordController,
    apiGetAllHelpRequestController,
    apiGetHelpRequestByIdController,
    apiSolveHelpRequestController,
    apiDeleteHelpRequestController,
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
    apiGetHasNotUpdatedInfoController,
    apiForgotPasswordController,
    apiResetPasswordByUserController,
    apiGetDashboardController,
    apiGetHelpByUserController,
    apiSaveTemplateMailController,
    apiGetTemplateMailController,
    apiSetDefaultTemplateMailController,
    apiGetTypesMailController,
    apiSendMailWithTemplateController,
    apiSendEmailExampleController
}