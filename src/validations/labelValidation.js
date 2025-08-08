import { z } from 'zod';
import { mongoIdSchema } from './commonValidation.js';

export const createLabelSchema = z.object({
    body: z.object({
      name: z.string({ required_error: 'Nama label wajib diisi' }),  
    }),
});

export const updateLabelSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Nama label wajib diisi' }),
    }),
    params: mongoIdSchema.shape.params,
});