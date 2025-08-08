import express from 'express';
import * as authController from '../controller/authController.js';
import validate from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../validations/authValidation.js';

const router = express.Router();


router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

export default router;