import z from 'zod';

export const registerRequestSchema = z.object({
	name: z.string().min(1, 'Nome é obrigatório').min(3, 'O nome deve ter pelo menos 3 caracteres'),
	email: z.email('Informe um e-mail válido'),
	password: z.string().min(1, 'Senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export type RegisterRequestDto = z.infer<typeof registerRequestSchema>;
