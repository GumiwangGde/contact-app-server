import express from 'express';
import * as contactController from '../controller/contactController.js';
import validate  from '../middleware/validate.js';
import upload from '../middleware/uploadMiddleware.js'; 
import { createContactSchema, updateContactSchema } from '../validations/contactValidation.js'
import { mongoIdSchema } from '../validations/commonValidation.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

router.route('/')
    .get(contactController.getAllContact)
    .post(validate(createContactSchema), contactController.createContact);

router.route('/:id')
    .get(validate(mongoIdSchema), contactController.getContact)
    .put(validate(updateContactSchema), contactController.updateContact)
    .delete(validate(mongoIdSchema), contactController.deleteContact);

router.patch(
    '/:id/photo',
    protect,
    upload.single('photo'),
    contactController.uploadContactPhoto
);

export default router;

