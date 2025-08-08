export const successResponse = (res, message, data, statusCode = 200) => {
    return res.status(statusCode).json({
        status: 'success',
        message: message,
        data: data
    });
};

export const errorResponse = (res, message, error = null, statusCode = 500) => {
    return res.status(statusCode).json({
        status: 'error',
        message: message,
        ...(process.env.NODE_ENV !== 'production' && error && { error: error.message })
    });
};

export const notFoundResponse = (res, message = 'Data tidak ditemukan') => {
    return res.status(404).json({
        status: 'fail',
        message: message,
        data: null
    });
}