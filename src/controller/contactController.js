import { successResponse, errorResponse, notFoundResponse } from '../helpers/responseHandler.js';
import * as contactService from '../services/contactService.js';

export const getAllContact = async (req, res) => {
    try {
        const contacts = await contactService.getAllContact(req.user._id ,req.query);
        return successResponse(res, 'Berhasil mengambil seluruh kontak', contacts);
    } catch (err) {
        return errorResponse(res, 'Gagal mengambil data kontak', err);
    }
};

export const getContact = async (req, res) => {
    try {
        const contact = await contactService.getContactById(req.user._id, req.params.id);
        if (!contact) {
            return notFoundResponse(res, 'Data kontak tidak ditemukan');
        }
        return successResponse(res, 'Berhasil mengambil data kontak', contact);
    } catch (err) {
        return errorResponse(res, 'Gagal mengambil data kontak', err);
    }
};

export const createContact = async (req, res) => {
    try {
        const contact = await contactService.createContact(req.user._id, req.body);
        return successResponse(res, 'Berhasil membuat data kontak', contact);
    } catch (err) {
        return errorResponse(res, 'Gagal membuat data kontak', err);
    }
};

export const updateContact = async (req, res) => {
    try {
        const contact = await contactService.updateContact(req.user._id, req.params.id, req.body);
        if (!contact) {
            return notFoundResponse(res, 'Data kontak tidak ditemukan');
        }
        return successResponse(res, 'Berhasil mengupdate data kontak', contact);
    } catch (err) {
        return errorResponse(res, 'Gagal mengupdate data kontak', err);
    }
};

export const uploadContactPhoto = async (req, res) => {
    try {
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
    } catch (err) {
        return errorResponse(res, 'Gagal mengunggah foto', err);
    }
};

export const deleteContact = async (req, res) => {
    try {
        const contact = await contactService.deleteContactById(req.user._id, req.params.id);
        if (!contact) {
            return notFoundResponse(res, 'Data kontak tidak ditemukan');
        }
        return successResponse(res, 'Berhasil menghapus data kontak', contact);
    } catch (err) {
        return errorResponse(res, 'Data kontak gagal dihapus', err);
    }
};

