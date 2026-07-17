import z from 'zod';

export const RegisterResponseSchema = z.object({});

export type RegisterResponseData = z.infer<typeof RegisterResponseSchema>;
