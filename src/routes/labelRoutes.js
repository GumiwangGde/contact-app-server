import express from 'express';
import * as labelController from '../controller/labelController.js';
import validate from '../middleware/validate.js';
import { mongoIdSchema } from '../validations/commonValidation.js';
import { updateLabelSchema } from '../validations/labelValidation.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

router.route('/')
    .get(labelController.getAllLabels)
    .post(labelController.createLabel);

router.route('/:id')
    .put(validate(updateLabelSchema), labelController.updateLabel)
    .delete(validate(mongoIdSchema), labelController.deleteLabel);

export default router;