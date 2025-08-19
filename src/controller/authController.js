import * as authService from '../services/authService.js'
import { successResponse } from '../helpers/responseHandler.js'
import catchAsync from '../helpers/catchAsync.js';

export const register = catchAsync(async (req, res, next) => {
    const newUser = await authService.register(req.body);
    const token = authService.signToken(newUser._id);
    return successResponse(res, 'Registrasi berhasil', { token, user: newUser }, 201);
});

export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    return successResponse(res, 'Login berhasil', { token });
});