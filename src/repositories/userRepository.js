import { User } from "../models/user.js";

export const create = async (data) => {
    const user = new User(data);
    return await user.save();
};

export const findByEmail = async (email) => {
    return await User.findOne({ email: email });
};