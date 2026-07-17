import z from 'zod';

export const MeResponseSchema = z.object({
	id: z.string(),
	email: z.email(),
	name: z.string(),
	role: z.enum(['USER', 'ADMIN']),
	imgUrl: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});
