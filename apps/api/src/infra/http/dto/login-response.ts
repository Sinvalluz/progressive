import z from 'zod';

export const LoginResponseSchema = z.object({
	token: z.string(),
	user: z.object({
		id: z.string(),
		email: z.email(),
		name: z.string(),
		role: z.enum(['USER', 'ADMIN']),
		imgUrl: z.string().nullable(),
		createAt: z.date(),
		updateAt: z.date(),
	}),
});
