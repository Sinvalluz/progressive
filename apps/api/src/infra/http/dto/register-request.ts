import z from 'zod';

export const RegisterRequestSchema = z.object({
	name: z.string().min(1, 'O nome é obrigatório.'),
	email: z.email('O e-mail é obrigatório.'),
	password: z.string().min(1, 'O nome é obrigatório.').min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});
