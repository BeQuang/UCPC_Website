import db from '../models/index';
const checkWL = async (email) => {
    let checkWhiteList = await db.Whitelist.findOne({
        where: {
            email: email
        }
    });
    if (checkWhiteList) {
        return {
            EC: -1,
            EM: 'Your password has been reset. Please login again.',
            DT: ''
        };
    }
    return {
        EC: 0,
        EM: 'Validate success',
        DT: ''
    };
}

const clearWL = async (email) => {
    let checkWhiteList = await db.Whitelist.findOne({
        where: {
            email: email
        }
    });
    if (checkWhiteList) {
        await db.Whitelist.destroy({
            where: {
                email: email
            }
        });
    }
}
const createWL = async (email) => {
    await db.Whitelist.create({
        email: email
    });
}
export {
    checkWL,
    clearWL,
    createWL
};