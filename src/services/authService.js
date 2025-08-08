import  jwt  from "jsonwebtoken";
import * as userRepository from '../repositories/userRepository.js'

const signToken = (id) => {
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

    newUser.password = undefined;

    return newUser;
};

export const login = async (email, password) => {
    if (!email || !password) {
        throw new Error('Mohon masukan email dan password');
    };

    const user = await userRepository.findByEmail(email);

    if (!user || !(await user.comparePassword(password))) {
        throw new Error('Email atau password salah');
    };

    const token = signToken(user._id);
    return token;
};