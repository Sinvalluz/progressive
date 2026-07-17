import z from 'zod';

export const LoginResponseSchema = z.object({});

export type LoginResponseData = z.infer<typeof LoginResponseSchema>;
