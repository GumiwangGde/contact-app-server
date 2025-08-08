import * as contactRepository from '../repositories/contactRepository.js';

export const getAllContact = async (userId, query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  const sortBy = query.sortBy || 'createdAt';
  const order = query.order ? query.order.trim() : 'desc';
  const sortOptions = { [sortBy]: order };

  const filter = { user: userId };
  if (query.name) {
    filter.name = { $regex: query.name, $options: 'i' };
  }
  if (query.phone) {
    filter.phone = query.phone;
  }

  const [contacts, totalContacts] = await Promise.all([
    contactRepository.find(filter, sortOptions, skip, limit),
    contactRepository.count(filter)
  ]);

  const totalPages = Math.ceil(totalContacts / limit);

  return {
    contacts,
    pagination: {
      currentPage: page,
      totalPages,
      totalContacts,
      limit,
    }
  }
};

export const getContactById = async (userId, id) => {
  return await contactRepository.findOne({ _id: id, user: userId });
};

export const createContact = async (userId, data) => {
  const dataWithOwner = { ...data, user: userId };
  return await contactRepository.create(dataWithOwner);
};

export const updateContact = async (id, data, userId) => {
  const updateFields = {};
  let updateOperation = {};

  if (data.name) updateFields.name = data.name;
  if (data.email) updateFields.email = data.email;
  if (data.phone) updateFields.phone = data.phone;

  if (Object.keys(updateFields).length > 0) {
    updateOperation.$set = updateFields;
  }

  if (data.addLabelId) {
    updateOperation.$addToSet = { labels: data.addLabelId };
  }
  
  return await contactRepository.findOneAndUpdate({_id: id, user: userId}, updateOperation);
};

export const deleteContactById = async (userId, id) => {
  return await contactRepository.findByIdAndDelete({_id: id, user: userId});
};

export const deleteContactByPhone = async (userId, phone) => {
  return await contactRepository.findOneAndDelete({ phone: phone, user: userId });
};

export const updateContactPhoto = async (userId, contactId, filePath) => {
  const contact = await contactRepository.findOne({ _id: contactId, user: userId });
  if (!contact) return null;
  contact.photo = filePath;
  return await contact.save();
};