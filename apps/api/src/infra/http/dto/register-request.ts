import z from 'zod';

export const RegisterRequestSchema = z.object({
	name: z.string().min(1, 'O nome é obrigatório.'),
	email: z.email('O e-mail é obrigatório.'),
	password: z
		.string()
		.min(1, 'A senha é obrigatória.')
		.min(6, 'A senha deve ter pelo menos 6 caracteres.')
		.max(100, 'A senha deve ter no máximo 100 caracteres.')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-\\[\]/+=~`]).+$/,
			'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
		),
	registrationToken: z.string().min(1, 'O token de registro é obrigatório.'),
});
