import db from '../models/index';
import bycrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { generateToken, verifyToken } from '../controllers/JWTActions';
import { checkWL, clearWL, createWL } from '../controllers/checkWhiteList';
import _ from 'lodash';
const csv = require('fast-csv');
const fs = require('fs');
import nodemailer from 'nodemailer';


const DateToString = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};
const ReplaceVariable = (htmlContent, dynamicData) => {
    for (let key in dynamicData) {
        const regex = new RegExp('{{' + key + '}}', 'g');
        htmlContent = htmlContent.replace(regex, dynamicData[key]);
    }
    return htmlContent;
}

const generatePIN = (PinLength) => {
    // Khai báo một biến để lưu trữ mã PIN
    let pin = '';

    // Tạo một vòng lặp để tạo ra 6 chữ số ngẫu nhiên
    for (let i = 0; i < PinLength; i++) {
        // Sử dụng hàm ngẫu nhiên Math.random() để chọn một chữ số từ 0 đến 9
        // Lấy phần nguyên của kết quả nhân với 10 để đảm bảo rằng nó là một số nguyên từ 0 đến 9
        const digit = Math.floor(Math.random() * 10);

        // Thêm chữ số này vào mã PIN
        pin += digit;
    }

    // Trả về mã PIN đã tạo
    return pin;
}
const apiSendingEmailService = async (email, title, content) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    let mailOptions = {
        from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL}>`,
        to: email,
        subject: title,
        html: content
    };
    try {
        await transporter.sendMail(mailOptions);
        return {
            EM: 'Send email success',
            EC: 0,
            DT: ''
        }
    } catch (error) {
        return {
            EM: 'Send email failed',
            EC: 500,
            DT: ''
        }
    }
}

const apiLoginService = async (email, password) => {
    try {
        let user = {};
        let user1 = await db.User.findOne({
            where: {
                email: email
            },
            raw: true
        });
        if (user1) {
            user = user1;
        } else {
            let user2 = await db.User.findOne({
                where: {
                    username: email
                },
                raw: true
            });
            if (user2) {
                user = user2;
            }
            else {
                return {
                    EM: 'User not found',
                    EC: 404,
                    DT: ''
                }
            }
        }
        let check = bycrypt.compareSync(password, user.password);
        if (check) {
            let payload = {
                email: user.email,
                role: user.role
            }
            let access_token = generateToken(payload);
            let accountInfo = await db.User.findOne({
                where: {
                    email: user.email
                },
                attributes: {
                    exclude: ['password', 'updatedAt', 'createdAt']
                },
                raw: true
            });

            let teamData = await db.Team.findOne({
                where: {
                    userId: accountInfo.id
                },
                attributes: ['id', 'teamName'],
                raw: true
            });

            if (teamData === null || teamData.teamName === '') {
                let noTeamData = {
                    "id": accountInfo.id,
                    "email": accountInfo.email,
                    "username": accountInfo.username,
                    "role": accountInfo.role,
                    "access_token": access_token,
                    "teamName": 'Not updated yet / admin account',
                    "Participants": []
                }
                await clearWL(accountInfo.email);
                return {
                    EM: 'Login Success',
                    EC: 0,
                    DT: noTeamData
                }

            } else {
                let detailData = await db.Process.findOne({
                    where: {
                        teamId: teamData.id
                    },
                    attributes: ['paidImage', 'isPaid', 'isUpdate', 'isHighSchool', 'trainerName'],
                    raw: true
                });
                let participantData = await db.Participant.findAll({
                    where: {
                        teamId: teamData.id
                    },
                    attributes: ['id', 'fullName', 'citizenId', 'phone', 'birth', 'schoolName'],
                    raw: true
                });
                let participantData2 = participantData.map(participant => {
                    return {
                        ...participant,
                        birth: DateToString(participant.birth)
                    }
                });

                let data = {
                    id: accountInfo.id,
                    email: accountInfo.email,
                    username: accountInfo.username,
                    role: accountInfo.role,
                    access_token: access_token,
                    paidImage: detailData.paidImage,
                    isPaid: detailData.isPaid,
                    isUpdate: detailData.isUpdate,
                    isHighSchool: detailData.isHighSchool,
                    trainerName: detailData.trainerName,
                    teamName: teamData.teamName,
                    Participants: [...participantData2]
                };
                let checkWhiteList = await db.Whitelist.findOne({
                    where: {
                        email: accountInfo.email
                    }
                });
                if (checkWhiteList) {
                    await db.Whitelist.destroy({
                        where: {
                            email: accountInfo.email
                        }
                    });
                }
                return {
                    EM: 'Login Success',
                    EC: 0,
                    DT: data
                }
            }

        }

        else {
            return {
                EM: 'Password is incorrect',
                EC: 400,
                DT: ''
            }
        }
    }
    catch (error) {
        return {
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        }
    }
}

const apiRegisterService = async (email, password, username) => {
    try {
        let checkUser = await db.User.findOne({
            where: {
                email: email
            }
        });
        if (checkUser) {
            return {
                EM: 'Email already registered',
                EC: -1,
                DT: ''
            }
        } else {
            let checkUser2 = await db.User.findOne({
                where: {
                    username: username
                }
            });
            if (checkUser2) {
                return {
                    EM: 'Username already registered',
                    EC: -1,
                    DT: ''
                }
            }
        }
        let salt = bycrypt.genSaltSync(10);
        let hash = bycrypt.hashSync(password, salt);
        await db.User.create({
            email: email,
            password: hash,
            username: username,
            role: 'USER'
        });
        let user = await db.User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return {
                EM: 'Register Failed',
                EC: 404,
                DT: ''
            }
        }
        await db.Team.create({
            userId: user.id,
            teamName: null
        });
        let team = await db.Team.findOne({
            where: {
                userId: user.id
            },
            raw: true
        });

        await db.Process.create({
            teamId: team.id,
            isUpdate: 0,
            paidImage: null,
            isPaid: 0,
            isHighSchool: null,
            trainerName: null
        });

        let title = 'Register Success';
        let htmlContent = '';
        try {
            htmlContent = fs.readFileSync('src/services/Mail/RegisterTemplate.html', 'utf8');
        } catch (error) {
            return {
                EM: "Something went wrong with email",
                EC: 500,
                DT: ''
            }
        }

        await apiSendingEmailService(email, title, htmlContent)

        return {
            EM: 'Register Success',
            EC: 0,
            DT: ''
        }
    } catch (error) {
        return {
            EM: 'Internal Server Error',
            EC: 500,
            DT: ''
        }
    }
}

const apiUpdateInfoService = async (data) => {
    /**
     * data = {
     *    userId: '',
     *    teamName: '',
     *    paidImage: '',
     *    isHighSchool: '',
     *    trainerName: '',
     *    Participants: [
     *       {
     *          fullName: '',
     *          citizenId: '',
     *          phone: '',   
     *          birth: '', //dd/mm/yyyy
     *          schoolName: ''
     *       }
     *    ]
     * }
     */
    const toDate = (date) => {
        const [day, month, year] = date.split("/").map(Number);
        return new Date(year, month - 1, day);
    }
    let isUpdate = await db.User.findOne({
        where: {
            id: data.userId
        },
        attributes: [],
        raw: true,
        include: [
            {
                model: db.Team,
                attributes: [],
                include: [
                    {
                        model: db.Process,
                        attributes: ['isUpdate'],
                        raw: true
                    }
                ]
            }
        ]
    });
    if (isUpdate['Team.Process.isUpdate'] !== null && isUpdate['Team.Process.isUpdate'] !== 0) {
        return {
            EM: 'User can update info only once',
            EC: 404,
            DT: ''
        }
    }
    if (!data.teamName || data.teamName === '' || !data.Participants || data?.Participants?.length < 3) {
        return {
            EM: 'Missing data to update',
            EC: 400,
            DT: ''
        }
    }

    let team = await db.Team.findOne({
        where: {
            userId: data.userId
        },
        raw: true
    });
    if (!team) {
        await db.Team.create({
            userId: data.userId,
            teamName: data.teamName
        });
        await db.Process.create({
            teamId: team.id,
            paidImage: data.paidImage ? data.paidImage : null,
            isPaid: 0,
            isHighSchool: data.isHighSchool === 'true' ? 1 : 0,
            trainerName: data.trainerName ? data.trainerName : null
        });

    }
    else {
        await db.Team.update({
            teamName: data.teamName
        }, {
            where: {
                userId: data.userId
            }
        });
        await db.Process.update({
            paidImage: data.paidImage ? data.paidImage : null,
            isHighSchool: data.isHighSchool === 'true' ? 1 : 0,
            trainerName: data.trainerName ? data.trainerName : null
        }, {
            where: {
                teamId: team.id
            }
        });
    }
    try {
        for (let i = 0; i < data.Participants.length; i++) {
            let participant = data.Participants[i];
            await db.Participant.create({
                teamId: team.id,
                fullName: participant.fullName || null,
                citizenId: participant.citizenId || null,
                phone: participant.phone || null,
                birth: participant.birth ? toDate(participant.birth) : new Date(),
                schoolName: participant.schoolName || null
            });
        }
        await db.Process.update({
            isUpdate: 1
        }, {
            where: {
                teamId: team.id
            }
        });
    } catch (error) {
        return {
            EM: "Something went wrong, please try again",
            EC: 404,
            DT: ''
        }

    }
    try {
        let accountInfoTemp = await db.User.findOne({
            where: {
                id: data.userId
            },
            attributes: {
                exclude: ['password', 'updatedAt', 'createdAt']
            },
            raw: true
        });
        //console.log('check account: ', accountInfoTemp);
        let teamDataTemp = await db.Team.findOne({
            where: {
                userId: data.userId
            },
            attributes: ['id', 'teamName'],
            raw: true
        });
        //console.log('check team: ', teamDataTemp);
        let detailDataTemp = await db.Process.findOne({
            where: {
                teamId: team.id
            },
            attributes: ['paidImage', 'isPaid', 'isUpdate', 'isHighSchool', 'trainerName'],
            raw: true
        });
        //console.log('check detail: ', detailDataTemp);
        let participantDataTemp = await db.Participant.findAll({
            where: {
                teamId: team.id
            },
            attributes: ['id', 'fullName', 'citizenId', 'phone', 'birth', 'schoolName'],
            raw: true
        });
        let participantDataTemp2 = participantDataTemp.map(participant => {
            return {
                ...participant,
                birth: DateToString(participant.birth)
            }
        });
        //console.log('check parti: ', participantDataTemp);
        let dataTemp = {
            id: accountInfoTemp.id,
            email: accountInfoTemp.email,
            username: accountInfoTemp.username,
            role: accountInfoTemp.role,
            paidImage: detailDataTemp.paidImage,
            access_token: generateToken({ email: accountInfoTemp.email, role: accountInfoTemp.role }),
            isPaid: detailDataTemp.isPaid,
            isUpdate: detailDataTemp.isUpdate,
            isHighSchool: detailDataTemp.isHighSchool,
            trainerName: detailDataTemp.trainerName,
            teamName: teamDataTemp.teamName,
            Participants: [...participantDataTemp2]
        };
        return {
            EM: 'Update Success',
            EC: 0,
            DT: dataTemp
        }
    } catch (error) {
        return {
            EM: 'some thing went wrong',
            EC: 500,
            DT: ''
        }
    }
}



const apiSendHelpRequestService = async (userId, title, data) => {

    let team = await db.Team.findOne({
        where: {
            userId: userId
        },
        attributes: ['id'],
        raw: true
    });
    if (!team) {
        return {
            EM: 'User not found',
            EC: 404,
            DT: ''
        }
    }
    try {
        await db.Request.create({
            teamId: team.id,
            title: title,
            data: data,
            isSolve: 0
        });
        return {
            EM: 'Send help request success',
            EC: 0,
            DT: ''
        }
    }
    catch (error) {
        return {
            EM: 'Send help request failed',
            EC: 500,
            DT: ''
        }
    }



}

const apiChangePasswordService = async (email, password, newPassword) => {

    let user = await db.User.findOne({
        where: {
            email: email
        },
        raw: true
    });
    if (!user) {
        return {
            EM: 'User not found',
            EC: 404,
            DT: ''
        }
    }
    let check = bycrypt.compareSync(password, user.password);
    if (!check) {
        return {
            EM: 'Password is incorrect',
            EC: 400,
            DT: ''
        }
    }
    let salt = bycrypt.genSaltSync(10);
    let hash = bycrypt.hashSync(newPassword, salt);
    try {
        await db.User.update({
            password: hash
        }, {
            where: {
                email: email
            }
        });
        return {
            EM: 'Change password success',
            EC: 0,
            DT: ''
        }
    } catch (error) {
        return {
            EM: 'Change password failed',
            EC: 500,
            DT: ''
        }
    }

}

const apiGetAllHelpRequestService = async (page, limit) => {
    let offset = (page - 1) * limit;
    let requests = await db.Request.findAndCountAll({
        attributes: ['id', 'title', 'data', 'isSolve'],
        include: [
            { model: db.Team, attributes: ['teamName'] }
        ],
        offset: offset,
        limit: limit,
        raw: true
    });
    if (!requests) {
        return {
            EM: 'Request not found',
            EC: 404,
            DT: ''
        }
    }
    let data = requests.rows.map(request => {
        return {
            id: request.id,
            title: request.title,
            data: request.data,
            isSolve: request.isSolve,
            teamName: request['Team.teamName']
        }
    });
    return {
        EM: 'Get all help request success',
        EC: 0,
        DT: {
            count: requests.count,
            rows: data
        }
    }
}

const apiGetHelpRequestByIdService = async (id) => {
    let request = await db.Request.findOne({
        where: {
            id: id
        },
        attributes: ['id', 'title', 'data', 'isSolve', 'response'],
        raw: true,
        include: [
            { model: db.Team, attributes: ['teamName'] }
        ]
    });
    if (!request) {
        return {
            EM: 'Request not found',
            EC: 404,
            DT: ''
        }
    }
    let data = {
        id: request.id,
        title: request.title,
        data: request.data,
        isSolve: request.isSolve,
        response: request.response,
        teamName: request['Team.teamName']
    }

    return {
        EM: 'Get help request by id success',
        EC: 0,
        DT: data
    }

}

const apiSolveHelpRequestService = async (id, response) => {

    let request = await db.Request.findOne({
        where: {
            id: id
        },
        raw: true
    });

    if (!request) {
        return {
            EM: 'Request not found',
            EC: 404,
            DT: ''
        }
    }
    if (request.isSolve === 1) {
        return {
            EM: 'Request has been solved',
            EC: 400,
            DT: ''
        }
    }
    try {
        await db.Request.update({
            isSolve: 1,
            response: response
        }, {
            where: {
                id: id
            }
        });
        return {
            EM: 'Solve help request success',
            EC: 0,
            DT: ''
        }
    } catch (error) {
        return {
            EM: 'Solve help request failed',
            EC: 500,
            DT: ''
        }
    }

}

const apiGetAllUsersService = async (page, limit) => {
    let users = {};
    if (limit === 0 || page === 0) {
        users = await db.User.findAndCountAll({
            attributes: ['id', 'email', 'username', 'role'],
            include: [
                {
                    model: db.Team,
                    attributes: ['teamName'],
                }
            ],
            raw: true
        });

    } else {
        let offset = (page - 1) * limit;
        users = await db.User.findAndCountAll({
            attributes: ['id', 'email', 'username', 'role'],
            include: [
                {
                    model: db.Team,
                    attributes: ['teamName'],
                }
            ],
            offset: offset,
            limit: limit,
            raw: true
        });
    }

    if (!users) {
        return {
            EM: 'There is no user registered',
            EC: 404,
            DT: ''
        }
    }
    let data = users.rows.map(user => {
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            teamName: user['Team.teamName'] || 'Not updated yet / admin account'
        }
    });

    return {
        EM: 'Get users success',
        EC: 0,
        DT: {
            count: users.count,
            rows: data
        }
    }

}

const apiGetUserByIdService = async (id) => {
    let user = await db.User.findOne({
        where: {
            id: id
        },
        raw: true
    });
    if (!user) {
        return {
            EM: 'User not found',
            EC: 404,
            DT: ''
        }
    }
    let accountInfo = await db.User.findOne({
        where: {
            id: user.id
        },
        attributes: {
            exclude: ['password', 'updatedAt', 'createdAt']
        },
        raw: true
    });

    let teamData = await db.Team.findOne({
        where: {
            userId: accountInfo.id
        },
        attributes: ['id', 'teamName'],
        raw: true
    });

    if (teamData === null) {
        let noTeamData = {
            "id": accountInfo.id,
            "email": accountInfo.email,
            "username": accountInfo.username,
            "role": accountInfo.role,
            "teamName": 'Not updated yet / admin account',
            "Participants": []
        }
        return {
            EM: 'Get user by id success',
            EC: 0,
            DT: noTeamData
        }

    } else {
        let detailData = await db.Process.findOne({
            where: {
                teamId: teamData.id
            },
            attributes: ['paidImage', 'isPaid', 'isUpdate', 'isHighSchool', 'trainerName'],
            raw: true
        });
        let participantData = await db.Participant.findAll({
            where: {
                teamId: teamData.id
            },
            attributes: ['id', 'fullName', 'citizenId', 'phone', 'birth', 'schoolName'],
            raw: true
        });
        let participantData2 = participantData.map(participant => {
            return {
                ...participant,
                birth: DateToString(participant.birth)
            }
        });

        let data = {
            id: accountInfo.id,
            email: accountInfo.email,
            username: accountInfo.username,
            role: accountInfo.role,
            paidImage: detailData.paidImage,
            isPaid: detailData.isPaid,
            isUpdate: detailData.isUpdate,
            isHighSchool: detailData.isHighSchool,
            trainerName: detailData.trainerName,
            teamName: teamData.teamName,
            Participants: [...participantData2]
        };

        return {
            EM: 'Get user by id success',
            EC: 0,
            DT: data
        }
    }
}

const apiDeleteUserService = async (id) => {
    if (id === 1) {
        return {
            EM: 'Cannot delete admin account',
            EC: 400,
            DT: ''
        }
    }
    try {
        let user = await db.User.findOne({
            where: {
                id: id
            }
        });
        if (!user) {
            return {
                EM: 'User not found',
                EC: 404,
                DT: ''
            }
        }
        let team = await db.Team.findOne({
            where: {
                userId: id
            }
        });
        let teamId = team.id;
        await db.User.destroy({ where: { id: id } });
        await db.Team.destroy({ where: { userId: id } });
        await db.Process.destroy({ where: { teamId: teamId } });
        await db.Participant.destroy({ where: { teamId: teamId } });
        await db.Request.destroy({ where: { teamId: teamId } });

        let [teamData, detailData, participantData, ProcessData, requestData] = await Promise.all([
            db.Team.findOne({ where: { userId: id } }),
            db.Process.findOne({ where: { teamId: teamId } }),
            db.Participant.findAll({ where: { teamId: teamId } }),
            db.Request.findAll({ where: { teamId: teamId } }),
            db.Request.findAll({ where: { teamId: teamId } })
        ]);
        if (teamData || detailData || participantData.length || ProcessData.length || requestData.length) {
            return {
                EM: 'Delete user failed, there are still some data left',
                EC: 500,
                DT: ''
            }
        }
        return {
            EM: 'Delete user success',
            EC: 0,
            DT: ''
        }
    } catch (error) {
        return {
            EM: 'Delete user failed',
            EC: 500,
            DT: ''
        }
    }
}

const apiResetPasswordService = async (id) => {

    let user = await db.User.findOne({
        where: {
            id: id
        },
        raw: true
    });
    if (!user) {
        return {
            EM: 'User not found',
            EC: 404,
            DT: ''
        }
    }
    let salt = bycrypt.genSaltSync(10);
    let hash = bycrypt.hashSync('123456', salt);
    try {
        await db.User.update({
            password: hash
        }, {
            where: {
                id: id
            }
        });
        await createWL(user.email);
        return {
            EM: 'Reset password success',
            EC: 0,
            DT: ''
        }
    } catch (error) {
        return {
            EM: 'Reset password failed',
            EC: 500,
            DT: ''
        }
    }
}
const apiConfirmPaymentService = async (id) => {
    let user = await db.User.findOne({
        where: {
            id: id
        },
        raw: true
    });
    if (!user) {
        return {
            EM: 'User not found',
            EC: 404,
            DT: ''
        }
    }
    let team = await db.Team.findOne({
        where: {
            userId: id
        },
        raw: true
    });
    if (!team) {
        return {
            EM: 'This user has not updated info yet',
            EC: 404,
            DT: ''
        }
    }
    let process = await db.Process.findOne({
        where: {
            teamId: team.id
        },
        raw: true
    });
    if (!process) {
        return {
            EM: 'There is something wrong, please try again',
            EC: 404,
            DT: ''
        }
    }
    if (process.isPaid === 1) {
        return {
            EM: 'Payment has been confirmed before',
            EC: 400,
            DT: ''
        }
    }
    try {
        await db.Process.update({
            isPaid: 1
        }, {
            where: {
                teamId: team.id
            }
        });
        return {
            EM: 'Confirm payment success',
            EC: 0,
            DT: ''
        }
    } catch (error) {
        return {
            EM: 'Confirm payment failed',
            EC: 500,
            DT: ''
        }
    }
}

const apiSearchByEmailService = async (email) => {
    if (!email) {
        return {
            EM: 'Missing email',
            EC: 400,
            DT: ''
        }
    }
    let user = await db.User.findAndCountAll({
        where: {
            email: email
        },
        include: [
            {
                model: db.Team,
                attributes: ['teamName'],
            }
        ],
        attributes: {
            exclude: ['password', 'updatedAt', 'createdAt']
        },
        raw: true
    });
    if (!user) {
        return {
            EM: 'User not found',
            EC: 404,
            DT: ''
        }
    }
    let listUser = user.rows.map(user => {
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            teamName: user['Team.teamName'] || 'Not updated yet / admin account'
        }
    });

    return {
        EM: 'Search user by email success',
        EC: 0,
        DT: {
            count: user.count,
            rows: listUser
        }
    }
}

const apiPrepareCSV = async () => {

    let users = await db.User.findAll({
        attributes: ['id', 'email', 'username', 'role'],
        include: [
            {
                model: db.Team,
                attributes: ['teamName'],
                include: [
                    {
                        model: db.Process,
                        attributes: ['isPaid', 'isUpdate', 'isHighSchool', 'trainerName']
                    },
                    {
                        model: db.Participant,
                        attributes: ['fullName', 'citizenId', 'phone', 'birth', 'schoolName']
                    }
                ]
            }
        ],
        raw: true
    });
    if (!users) {
        return {
            EM: 'There is no user registered',
            EC: 404,
            DT: ''
        }
    }
    // Mảng để lưu trữ các team đã nhóm lại
    let teamsArray = [];

    // Object để lưu trữ team theo id
    let teamObject = {};
    // Duyệt qua kết quả từ cơ sở dữ liệu
    users.forEach(result => {
        const teamId = result.id;

        // Nếu teamObject không có đối tượng với id tương ứng thì tạo mới
        if (!teamObject[teamId]) {
            teamObject[teamId] = {
                id: teamId,
                email: result.email,
                username: result.username,
                role: result.role,
                teamName: result['Team.teamName'] || 'Not updated yet / admin account',
                isPaid: result['Team.Process.isPaid'] || 0,
                isUpdate: result['Team.Process.isUpdate'] || 0,
                isHighSchool: result['Team.Process.isHighSchool'] || 0,
                trainerName: result['Team.Process.trainerName'],
                participants: []
            };
        }

        // Thêm participant vào mảng participants của teamObject
        const participant = {
            fullName: result['Team.Participants.fullName'],
            citizenId: result['Team.Participants.citizenId'],
            phone: result['Team.Participants.phone'],
            birth: result['Team.Participants.birth'] ? DateToString(result['Team.Participants.birth']) : result['Team.Participants.birth'],
            schoolName: result['Team.Participants.schoolName']
        };

        teamObject[teamId].participants.push(participant);
    });


    // Duyệt qua các team trong teamObject
    Object.values(teamObject).forEach(team => {
        // Lặp qua từng participant trong mảng participants của team
        for (let i = 0; i < 3; i++) {
            if (!team.participants[i]) {
                team[`participant${i + 1}_fullName`] = null;
                team[`participant${i + 1}_citizenId`] = null;
                team[`participant${i + 1}_phone`] = null;
                team[`participant${i + 1}_birth`] = null;
                team[`participant${i + 1}_schoolName`] = null;
                continue;
            }
            const participant = team.participants[i];

            // Thêm thông tin của từng participant vào đối tượng teamObject
            team[`participant${i + 1}_fullName`] = participant.fullName ? participant.fullName : null;
            team[`participant${i + 1}_citizenId`] = participant.citizenId ? participant.citizenId : null;
            team[`participant${i + 1}_phone`] = participant.phone ? participant.phone : null;
            team[`participant${i + 1}_birth`] = participant.birth ? participant.birth : null;
            team[`participant${i + 1}_schoolName`] = participant.schoolName ? participant.schoolName : null;
        }
        // Xóa mảng participants khỏi đối tượng teamObject
        delete team.participants;
    });
    teamsArray = Object.values(teamObject);
    // Chuyển đổi teamObject thành mảng gồm các đối tượng nhóm lại theo id
    try {
        const csvStream = csv.format({ headers: true });
        const writableStream = fs.createWriteStream('user_data.csv', { encoding: 'utf8' });

        csvStream.pipe(writableStream);

        // Sử dụng Promise.all để đợi cho tất cả các dòng dữ liệu được viết vào writable stream
        await Promise.all(teamsArray.map(row => new Promise((resolve, reject) => {
            csvStream.write(row, (err) => {
                if (err) reject(err);
                else resolve();
            });
        })));

        // Kết thúc việc viết dữ liệu
        csvStream.end();

        // Chờ cho sự kiện 'finish' của writable stream để biết khi nào việc tạo file CSV hoàn thành
        await new Promise((resolve, reject) => {
            writableStream.on('finish', () => {
                console.log('CSV file created successfully');
                resolve('user_data.csv');
            });

            writableStream.on('error', (err) => {
                console.error('Error creating CSV file:', err);
                reject(err);
            });
        });
        return {
            EM: 'Prepare CSV success',
            EC: 0,
            DT: 'user_data.csv'
        }
    } catch (err) {
        console.error('Error creating CSV file:', err);
        throw err;
    }

}

const apiUpdateUserByAdminService = async (data) => {
    /**
     * data = {
     *    userId: '',
     *    teamName: '',
     *    paidImage: '',
     *    isHighSchool: '',
     *    trainerName: '',
     *    Participants: [
     *       {
     *          fullName: '',
     *          citizenId: '',
     *          phone: '',   
     *          birth: '', //dd/mm/yyyy
     *          schoolName: ''
     *       }
     *    ]
     * }
     */
    const toDate = (date) => {
        const [day, month, year] = date.split("/").map(Number);
        return new Date(year, month - 1, day);
    }
    let user = await db.User.findOne({ where: { id: data.userId }, raw: true });

    if (!user) {
        return {
            EM: 'User not found',
            EC: 404,
            DT: ''
        }
    }
    await db.User.update({ email: data.email, username: data.username }, { where: { id: data.userId } });

    let team = await db.Team.findOne({ where: { userId: data.userId } });

    if (!team) {
        await db.Team.create({ userId: data.userId, teamName: data.teamName });
    }
    else {
        await db.Team.update({ teamName: data.teamName }, { where: { userId: data.userId } });
    }
    let participants = await db.Participant.findAll({ where: { teamId: team.id } });

    if (!participants.length) {
        for (let i = 0; i < data.Participants.length; i++) {
            let participant = data.Participants[i];
            await db.Participant.create({
                teamId: team.id,
                fullName: participant.fullName || null,
                citizenId: participant.citizenId || null,
                phone: participant.phone || null,
                birth: participant.birth ? toDate(participant.birth) : new Date(),
                schoolName: participant.schoolName || null
            });
        }
    }
    else {
        for (let i = 0; i < data.Participants.length; i++) {
            let participant = data.Participants[i];
            await db.Participant.update({
                fullName: participant.fullName || null,
                citizenId: participant.citizenId || null,
                phone: participant.phone || null,
                birth: participant.birth ? toDate(participant.birth) : new Date(),
                schoolName: participant.schoolName || null
            }, {
                where: { teamId: team.id }
            });
        }
    }
    let detail = await db.Process.findOne({ where: { teamId: team.id } });

    if (!detail) {
        await db.Process.create({
            teamId: team.id,
            paidImage: data.paidImage ? data.paidImage : null,
            isPaid: 0,
            isHighSchool: data.isHighSchool === 'true' ? 1 : 0,
            trainerName: data.trainerName ? data.trainerName : null
        });
    } else {
        await db.Process.update({
            paidImage: data.paidImage ? data.paidImage : null,
            isHighSchool: data.isHighSchool === 'true' ? 1 : 0,
            trainerName: data.trainerName ? data.trainerName : null
        }, {
            where: { teamId: team.id }
        });
    }

    return {
        EM: 'Update user by admin success',
        EC: 0,
        DT: ''
    }
}
const apiGetUnpaidTeamsService = async (isUpdatedImage) => {
    let teams = [];
    if (isUpdatedImage) {
        teams = await db.Team.findAll({
            attributes: ['userId', 'teamName'],
            include: [
                {
                    model: db.Process,
                    where:
                    {
                        isPaid: { [Op.eq]: 0 },
                        paidImage: { [Op.not]: null }, // paidImage khác rỗng ('')
                    }
                }
            ],
            raw: true
        });
    }
    else {
        teams = await db.Team.findAll({
            attributes: ['userId', 'teamName'],
            include: [
                {
                    model: db.Process,
                    where: {
                        isPaid: 0
                    }
                }
            ],
            raw: true
        });
    }


    if (teams.length === 0) {
        if (isUpdatedImage) {
            return {
                EM: 'There is no unpaid team with updated image',
                EC: -1,
                DT: ''
            }
        }
        return {
            EM: 'There is no unpaid team',
            EC: -1,
            DT: ''
        }
    }

    let users = await db.User.findAll({
        where: {
            id: teams.map(team => team.userId)
        },
        attributes: ['id', 'email', 'username', 'role'],
        raw: true
    });
    users = users.map(user => {
        return {
            ...user,
            teamName: teams.find(team => team.userId === user.id).teamName || 'Not updated yet / admin account'
        }
    });
    return {
        EM: 'Get unpaid teams success',
        EC: 0,
        DT: users
    }
}
const apiGetUnSolvedRequestsService = async () => {
    let requests = await db.Request.findAll({
        where: {
            isSolve: 0
        },
        attributes: ['id', 'title', 'data'],
        include: [
            {
                model: db.Team,
                attributes: ['teamName']
            }
        ],
        raw: true
    });
    if (requests.length === 0) {
        return {
            EM: 'There is no unsolved request',
            EC: -1,
            DT: ''
        }
    }
    requests = requests.map(request => {
        return {
            id: request.id,
            title: request.title,
            data: request.data,
            teamName: request['Team.teamName']
        }
    });
    return {
        EM: 'Get unsolved requests success',
        EC: 0,
        DT: requests
    }

}
const apiGetHasNotUpdatedInfoService = async () => {

    let teamIds = await db.Process.findAll({
        where: {
            isUpdate: 0
        },
        attributes: ['teamId'],
        raw: true
    });
    if (teamIds.length === 0) {
        return {
            EM: 'There is no team has not updated info',
            EC: -1,
            DT: ''
        }
    }
    let users = await db.User.findAll({
        include: [
            {
                model: db.Team,
                attributes: ['teamName'],
                where: {
                    id: teamIds.map(team => team.teamId)
                }
            }
        ],
        attributes: ['id', 'email', 'username', 'role'],
        raw: true
    });
    users = users.map(user => {
        let teamName = user['Team.teamName'];
        delete user['Team.teamName'];
        return {
            ...user,
            teamName: teamName ? teamName : 'Not updated yet / admin account'
        }
    });
    console.log('check users: ', users);

    return {
        EM: 'Get teams has not updated info success',
        EC: 0,
        DT: users
    }

}
const apiForgotPasswordService = async (email) => {
    let user = await db.User.findOne({
        attributes: ['id'],
        where: {
            email: email
        },
        raw: true
    });
    if (!user) {
        return {
            EM: 'User not found',
            EC: 404,
            DT: ''
        }
    }
    let checkPIN = await db.PIN.findOne({
        where: {
            email: email
        },
        raw: true
    });
    if (checkPIN) {
        await db.PIN.destroy({
            where: {
                email: email
            }
        });
    }

    let PIN = generatePIN(6);

    let token = generateToken({ email: email, role: 'RESET_PASSWORD', PIN: PIN });

    let htmlContent = '';
    try {
        htmlContent = fs.readFileSync('src/services/Mail/ResetMailTemplate.html', 'utf8');
    } catch (error) {
        return {
            EM: "Something went wrong with email",
            EC: 500,
            DT: ''
        }
    }

    let dynamicData = {
        PIN: PIN
    }

    let htmlContentCopy = ReplaceVariable(htmlContent, dynamicData);

    let title = 'Reset Password';
    try {
        await apiSendingEmailService(email, title, htmlContentCopy);
        await db.PIN.create({
            email: email,
            PIN: token
        });
        return {
            EM: 'Send email success',
            EC: 0,
            DT: ''
        }
    } catch (error) {
        return {
            EM: 'Send email failed',
            EC: 500,
            DT: ''
        }
    }


}

const apiResetPasswordByUserService = async (email, PIN, newPassword) => {

    let checkPIN = await db.PIN.findOne({
        where: {
            email: email
        },
        raw: true
    });
    let checkPinToken = verifyToken(`Bearer ${checkPIN.PIN}`);

    if (checkPinToken.EC !== 0 && checkPinToken.EM === 'jwt expired') {
        return res.status(403).json({
            EC: -999,
            EM: "Your PIN is expired, please try again!",
            DT: ""
        });
    }

    if (checkPinToken.DT.PIN !== PIN) {
        return {
            EM: 'PIN is incorrect',
            EC: 400,
            DT: ''
        }
    }

    let salt = bycrypt.genSaltSync(10);
    let hash = bycrypt.hashSync(newPassword, salt);
    try {
        await db.User.update({
            password: hash
        }, {
            where: {
                email: email
            }
        });
        await db.PIN.destroy({
            where: {
                email: email
            }
        });
        await createWL(email);
        return {
            EM: 'Reset password success',
            EC: 0,
            DT: ''
        }
    } catch (error) {
        return {
            EM: 'Reset password failed',
            EC: 500,
            DT: ''
        }
    }
}

const apiGetDashBoardService = async () => {

    /**
     * totalUser
     * totalUpdatedInfo
     * totalPaid
     * 
     */
}

export {
    apiLoginService,
    apiRegisterService,
    apiUpdateInfoService,
    apiSendHelpRequestService,
    apiChangePasswordService,
    apiGetAllHelpRequestService,
    apiGetHelpRequestByIdService,
    apiSolveHelpRequestService,
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
    apiGetDashBoardService
}