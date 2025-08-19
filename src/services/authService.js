import  jwt  from "jsonwebtoken";
import * as userRepository from '../repositories/userRepository.js'
import AppError from "../helpers/appError.js";

export const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

export const register = async (userData) => {
    const newUser = await userRepository.create({
        name: userData.name,
        email: userData.email,
        password: userData.password
    });
    return newUser;
};

export const login = async (email, password) => {
    if (!email || !password) {
        throw new AppError('Mohon masukkan email dan password', 400);
    }
    const user = await userRepository.findByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
        throw new AppError('Email atau password salah', 401);
    }
    const token = signToken(user._id);
    return token;
};