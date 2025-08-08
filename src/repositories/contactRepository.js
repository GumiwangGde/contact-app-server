import { Contact } from '../models/contact.js';

export const create = async (data) => {
  const contact = new Contact(data);
  return await contact.save();
};

export const find = async (filter, sortOptions, skip, limit) => {
  return await Contact.find(filter).sort(sortOptions).skip(skip).limit(limit);
};

export const findOne = async(filter) => {
  return await Contact.findOne(filter);
};

export const count = async (filter) => {
  return await Contact.countDocuments(filter);
};

export const findOneAndUpdate = async (filter, data) => {
  return await Contact.findOneAndUpdate(filter, data, { new: true });
};

export const findOneAndDelete = async (filter) => {
  return await Contact.findOneAndDelete(filter);
};