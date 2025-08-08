import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { errorResponse } from '../helpers/responseHandler.js';

export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    };
    if (!token) {
        return errorResponse(res, 'Anda belum login, Silakan login untuk mendapatkan akses', null, 401);
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return errorResponse(res, 'User pemilik token ini sudah tidak ada', null, 401);
        };
        req.user = currentUser;
        next();
    } catch (err) {
        return errorResponse(res, 'Token tidak valid atau sudah kadaluwarsa', err, 401);
    }
};