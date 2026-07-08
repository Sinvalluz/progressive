import z from 'zod';

export const LoginFormSchema = z.object({
	email: z.email('Digite um e-mail válido.').max(99, 'O e-mail deve ter no máximo 100 caracteres.'),
	password: z
		.string()
		.min(6, 'A senha deve ter pelo menos 6 caracteres.')
		.max(100, 'A senha deve ter no máximo 100 caracteres.')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-\\[\]/+=~`]).+$/,
			'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
		),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;
