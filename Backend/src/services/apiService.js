import db from '../models/index';
import bycrypt from 'bcryptjs';
import { generateToken } from '../controllers/JWTActions';

const apiLoginService = async (email, password) => {
    try {
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
        if (check) {
            let payload = {
                email: user.email,
                role: user.role
            }
            let access_token = generateToken(payload);
            let accountInfo = await db.User.findOne({
                where: {
                    email: email
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
                    "access_token": access_token,
                    "teamName": 'Not updated yet / admin account',
                    "Participants": []
                }
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
                    Participants: [...participantData]
                };

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
        }

        let salt = bycrypt.genSaltSync(10);
        let hash = bycrypt.hashSync(password, salt);
        let newUser = await db.User.create({
            email: email,
            password: hash,
            username: username,
            role: 'USER'
        });
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
    await db.Team.create({
        userId: data.userId,
        teamName: data.teamName
    });
    let team = await db.Team.findOne({
        where: {
            userId: data.userId
        },
        raw: true
    });
    if (!team) {
        return {
            EM: 'Something went wrong, please try again',
            EC: 404,
            DT: ''
        }
    }
    else {
        await db.Process.create({
            teamId: team.id,
            paidImage: data.paidImage ? data.paidImage : '',
            isPaid: 0,
            isHighSchool: data.isHighSchool === 'true' ? 1 : 0,
            trainerName: data.trainerName ? data.trainerName : ''
        });
        try {

            for (let i = 0; i < data.Participants.length; i++) {
                let participant = data.Participants[i];
                await db.Participant.create({
                    teamId: team.id,
                    fullName: participant.fullName || '',
                    citizenId: participant.citizenId || '',
                    phone: participant.phone || '',
                    birth: participant.birth ? toDate(participant.birth) : new Date(),
                    schoolName: participant.schoolName || ''
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
                Participants: [...participantDataTemp]
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
export {
    apiLoginService,
    apiRegisterService,
    apiUpdateInfoService,
    apiSendHelpRequestService,
    apiChangePasswordService
}