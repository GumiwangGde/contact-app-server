import * as labelService from '../services/labelService.js';
import { successResponse, errorResponse, notFoundResponse } from '../helpers/responseHandler.js';
import catchAsync from '../helpers/catchAsync.js';

export const createLabel = catchAsync(async (req, res, next) => {
    const label = await labelService.createLabel(req.user._id, req.body);
    return successResponse(res, 'Label berhasil dibuat', label, 201);
});

export const getAllLabels = catchAsync(async (req, res, next) => {
        const labels = await labelService.getAllLabels(req.user._id);
        return successResponse(res, 'Berhasil mengambil semua label', labels);
});

export const updateLabel = catchAsync(async (req, res, next) => {
    const label = await labelService.updateLabelById(req.user._id ,req.params.id, req.body);
    if (!label) {
        return notFoundResponse(res, 'Label tidak ditemukan');
    }
    return successResponse(res, 'Berhasil mengupdate label', label);
});

export const deleteLabel = catchAsync(async (req, res, next) => {
    const label = await labelService.deleteLabelById(req.user_id, req.params.id);
    if (!label) {
        return notFoundResponse(res, 'Label tidak ditemukan');
    }
    return successResponse(res, 'Label berhasil dihapus');
});