import * as labelRepository from '../repositories/labelRepository.js';

export const createLabel = async (userId, data) => {
    const dataWithOwner = { ...data, user: userId };
    return await labelRepository.create(dataWithOwner);
};

export const getAllLabels = async (userId) => {
    return await labelRepository.find({ user: userId });
};

export const updateLabelById = async (userId, id, data) => {
    const updateData = { name: data.name };
    return await labelRepository.findOneAndUpdate({_id: id, user: userId}, updateData);
};

export const deleteLabelById = async (userId, id) => {
    return await labelRepository.findOneAndDelete({_id: id, user: userId});
}