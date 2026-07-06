import z from 'zod';

export const RegisterFormSchema = z
	.object({
		name: z.string().min(1, 'O nome é obrigatório.').max(49, 'O nome deve ter no máximo 50 caracteres.'),
		email: z.email('Digite um e-mail válido.').max(99, 'O e-mail deve ter no máximo 100 caracteres.'),
		password: z
			.string()
			.min(6, 'A senha deve ter pelo menos 6 caracteres.')
			.max(100, 'A senha deve ter no máximo 100 caracteres.')
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-\\[\]/+=~`]).+$/,
				'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
			),
		confirmPassword: z
			.string()
			.min(6, 'A confirmação de senha deve ter pelo menos 6 caracteres.')
			.max(99, 'A confirmação de senha deve ter no máximo 100 caracteres.'),
		registrationToken: z
			.string()
			.min(1, 'O token de cadastro é obrigatório.')
			.max(99, 'O token de cadastro deve ter no máximo 99 caracteres.'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'As senhas não coincidem.',
		path: ['confirmPassword'],
	});

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;
