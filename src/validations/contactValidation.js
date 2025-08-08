import { z } from 'zod';

// Skema untuk membuat kontak baru
export const createContactSchema = z.object({
  body: z.object({
    name: z.string({ 
      required_error: 'Nama wajib diisi',
      invalid_type_error: 'Nama wajib diisi',
    }).min(3, 'Nama minimal 3 karakter'),

    email: z.string({
      required_error: 'Email wajib diisi',
      invalid_type_error: 'Email wajib diisi',
    }).email('Format email tidak valid'),

    phone: z.string({
      required_error: 'Nomor telepon wajib diisi',
      invalid_type_error: 'Nomor telepon wajib diisi',
    }),
  }),
});

// Skema untuk mengupdate kontak
export const updateContactSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Nama harus berupa teks',
    }).min(3, 'Nama minimal 3 karakter').optional(),

    email: z.string({
      invalid_type_error: 'Email harus berupa teks',
    }).email('Format email tidak valid').optional(),
    
    phone: z.string({
      invalid_type_error: 'Nomor telepon harus berupa teks',
    }).optional(),

    addLabelId: z.string({
      invalid_type_error: 'ID Label harus berupa teks'
    }).regex(/^[0-9a-fA-F]{24}$/, 'Format ID Label tidak valid').optional(),

    }).refine((data) => Object.keys(data).length > 0, {
      message: 'Setidaknya satu field harus diisi untuk melakukan update',
    }),

    params: z.object({
      id: z.string({
        required_error: 'ID kontak wajib diisi'
      }).regex(/^[0-9a-fA-F]{24}$/, 'Format ID tidak valid'),
    }),
});