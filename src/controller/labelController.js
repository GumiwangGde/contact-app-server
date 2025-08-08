import * as labelService from '../services/labelService.js';
import { successResponse, errorResponse, notFoundResponse } from '../helpers/responseHandler.js';

export const createLabel = async (req, res) => {
    try {
        const label = await labelService.createLabel(req.user._id, req.body);
        return successResponse(res, 'Label berhasil dibuat', label, 201);
    } catch (err) {
        return errorResponse(res, 'Gagal membuat label', err);
    }
};

export const getAllLabels = async (req, res) => {
    try {
        const labels = await labelService.getAllLabels(req.user._id);
        return successResponse(res, 'Berhasil mengambil semua label', labels);
    } catch (err) {
        return errorResponse(res, 'Gagal mengambil label', err);
    }
}

export const updateLabel = async (req, res) => {
    try {
        const label = await labelService.updateLabelById(req.user._id ,req.params.id, req.body);
        if (!label) {
            return notFoundResponse(res, 'Label tidak ditemukan');
        }
        return successResponse(res, 'Berhasil mengupdate label', label);
    } catch (err) {
        return errorResponse(res, 'Gagal mengupdate label', err);
    }
}

export const deleteLabel = async (req, res) => {
    try {
        const label = await labelService.deleteLabelById(req.user_id, req.params.id);
        if (!label) {
            return notFoundResponse(res, 'Label tidak ditemukan');
        }
        return successResponse(res, 'Label berhasil dihapus');
    } catch (err) {
        return errorResponse(res, 'Gagal menghapus label', err);
    }
}