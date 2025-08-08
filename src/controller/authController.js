import * as authService from '../services/authService.js'
import { successResponse, errorResponse } from '../helpers/responseHandler.js'

export const register = async (req, res) => {
    try {
        const newUser = await authService.register(req.body);
        return successResponse(res, 'Registrasi berhasil', newUser, 201);
    } catch (err) {
        if (err.code === 11000) {
            return errorResponse(res, 'Email sudah terdaftar', null, 400);
        };
        return errorResponse(res, 'Registrasi gagal', err);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        return successResponse(res, 'Login berhasil', { token });
    } catch (err) {
        return errorResponse(res, err.message, null, 401);
    }
};