import { errorResponse } from '../helpers/responseHandler.js';
import AppError from '../helpers/appError.js';

// Fungsi untuk menangani error format ID dari Mongoose
const handleCastErrorDB = (err) => {
  const message = `Nilai '${err.value}' tidak valid untuk field '${err.path}'.`;
  return new AppError(message, 400);
};

// Fungsi untuk menangani error duplikat dari Mongoose
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Nilai duplikat: ${value}. Mohon gunakan nilai lain.`;
  return new AppError(message, 400);
};

// Fungsi untuk menangani error validasi dari Mongoose
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Input tidak valid. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Token tidak valid. Mohon login kembali.', 401);
const handleJWTExpiredError = () => new AppError('Token Anda sudah kedaluwarsa. Mohon login kembali.', 401);


const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Proses error spesifik dari Mongoose atau JWT
  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

  // Kirim respons error yang sudah diformat
  return errorResponse(res, error.message, error, error.statusCode || 500);
};

export default globalErrorHandler;