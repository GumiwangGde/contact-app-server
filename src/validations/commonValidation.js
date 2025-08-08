import { z } from 'zod';

export const mongoIdSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'ID wajib diisi'
    }).regex(/^[0-9a-fA-F]{24}$/, 'Format ID tidak valid'),
  }),
});