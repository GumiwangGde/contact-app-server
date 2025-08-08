import { Label } from "../models/label.js";

export const create = async (data) => {
    const label = new Label(data);
    return await label.save();
};

export const find = async (filter) => {
    return await Label.find(filter);
};

export const findOne = async (filter) => {
  return await Label.findOne(filter);
};

export const findOneAndUpdate = async (filter, data) => {
  return await Label.findOneAndUpdate(filter, data, { new: true });
};

export const findOneAndDelete = async (filter) => {
  return await Label.findOneAndDelete(filter);
};
