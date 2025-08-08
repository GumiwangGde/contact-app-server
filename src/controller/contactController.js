import { successResponse, notFoundResponse } from '../helpers/responseHandler.js';
import * as contactService from '../services/contactService.js';
import catchAsync from '../helpers/catchAsync.js';

export const getAllContact = catchAsync(async (req, res, next) => {
    const result = await contactService.getAllContact(req.user._id ,req.query);
    return successResponse(res, 'Berhasil mengambil seluruh kontak', result);
});

export const getContact = catchAsync(async (req, res, next) => {
    const contact = await contactService.getContactById(req.user._id, req.params.id);
    if (!contact) {
        return notFoundResponse(res, 'Data kontak tidak ditemukan');
    }
    return successResponse(res, 'Berhasil mengambil data kontak', contact);
});

export const createContact = catchAsync(async (req, res, next) => {
    const contact = await contactService.createContact(req.user._id, req.body);
    return successResponse(res, 'Berhasil membuat data kontak', contact);
});

export const updateContact = catchAsync(async (req, res, next) => {
    const contact = await contactService.updateContact(req.user._id, req.params.id, req.body);
    if (!contact) {
        return notFoundResponse(res, 'Data kontak tidak ditemukan');
    }
    return successResponse(res, 'Berhasil mengupdate data kontak', contact);
});

export const uploadContactPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) {
        return notFoundResponse(res, 'Tidak ada file yang diunggah', null, 400);
    }
    const filePath = req.file.path;
    const contact = await contactService.updateContactPhoto(
        req.user._id,
        req.params.id,
        filePath
    );
    if (!contact) {
        return notFoundResponse(res, 'Kontak tidak ditemukan');
    }
    return successResponse(res, 'Foto kontak berhasil diunggah', contact);
});

export const deleteContact = catchAsync(async (req, res, next) => {
    const contact = await contactService.deleteContactById(req.user._id, req.params.id);
    if (!contact) {
        return notFoundResponse(res, 'Data kontak tidak ditemukan');
    }
    return successResponse(res, 'Berhasil menghapus data kontak', contact);
});

