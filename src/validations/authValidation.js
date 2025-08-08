import { z } from "zod";

export const registerSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Nama wajib diisi' }),
        email: z.string({ required_error: 'Email wajib diisi' }).email(),
        password: z.string({ required_error: 'Password wajib diisi' }).min(6), 
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'Email wajib diisi' }).email(),
        password: z.string({ required_error: 'Password wajib diisi' }),
    }),
});