import z from 'zod';

export const RegisterResponseSchema = z.object({
	id: z.string(),
	email: z.email(),
	name: z.string(),
	role: z.enum(['USER', 'ADMIN']),
	createAt: z.date(),
	updateAt: z.date(),
});
