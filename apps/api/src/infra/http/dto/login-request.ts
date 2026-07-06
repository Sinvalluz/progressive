import z from 'zod';

export const LoginRequestSchema = z.object({
	email: z.email('O e-mail é obrigatório.'),
	password: z.string().min(1, 'A senha é obrigatória.').min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});
