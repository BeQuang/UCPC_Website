import jwt from 'jsonwebtoken';
const publicRoutes = ['/login', '/register'];
const adminRoutes = ['/resetPassword/:id', '/updateInfo', '/getAllHelpRequest', '/getHelpRequestById/:id', '/solveHelpRequest', '/getAllUser', '/getUserById/:id', '/deleteUser/:id', '/confirmPayment/:id', '/searchByEmail', '/filterUnPaid', '/filterPaid', '/filterSolved', '/filterUnSolved', '/filterIsUpdate'];
import { checkWL } from './checkWhiteList';
const generateToken = (payload) => {
    let token = '';
    try {
        token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    } catch (error) {
        console.log(error);
    }
    return token;
}

const verifyToken = (token) => {
    token = token.split(' ')[1];
    let payload = '';
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        payload = decoded;
    } catch (error) {
        /*
        err = {
            name: 'TokenExpiredError',
            message: 'jwt expired',
            expiredAt: 1408621000
        }
        */
        return {
            EC: -1,
            EM: error.message,
            DT: ''
        };
    }
    return {
        EC: 0,
        EM: 'Validate success',
        DT: payload
    };
}

const permissionMiddleware = async (req, res, next) => {
    if (publicRoutes.includes(req.path)) {
        return next();
    }
    const token = req.headers && req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            EM: 'Unauthorized',
            EC: 401,
            DT: ''
        });
    }
    try {
        const decoded = verifyToken(token);
        // decoded = {
        //     EC: 0,
        //     EM: 'Validate success',
        //     DT: { email: 'admin', role: 'ADMIN' }
        // }
        if (decoded.EC === 0) {
            let checkWhiteList = await checkWL(decoded.DT.email);
            if (checkWhiteList.EC !== 0) {
                return res.status(403).json({
                    EC: -999,
                    EM: checkWhiteList.EM,
                    DT: ''
                });
            }
            if (decoded.DT.role === 'USER') {
                console.log(req.path);

                if (!adminRoutes.includes(req.path)) {
                    return res.status(403).json({
                        EC: -1,
                        EM: "You are not allow to access this path",
                        DT: ""
                    });
                } else { return next(); }
            }
        } else if (decoded.EC !== 0 && decoded.EM === 'jwt expired') {
            return res.status(403).json({
                EC: -999,
                EM: "Your token is expired, please login again",
                DT: ""
            });
        } else {
            return res.status(403).json({
                EC: -999,
                EM: "There is an error with your token, please login again",
                DT: ""
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            EM: 'Unauthorized',
            EC: 401,
            DT: ''
        });
    }

}
export { generateToken, verifyToken, permissionMiddleware };