import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { paths } from '@/config/path';
import HookFormController from '../../components/hook-form-controller';

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

export default function Form() {
	const form = useForm<z.infer<typeof RegisterFormSchema>>({
		resolver: zodResolver(RegisterFormSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			registrationToken: '',
		},
	});

	function onSubmit(data: z.infer<typeof RegisterFormSchema>) {
		console.log(data);
		form.reset();
	}
	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className='space-y-2'
		>
			<div className='space-y-3'>
				<HookFormController
					label='Nome de usuário'
					name='name'
					control={form.control}
					placeholder='Sinval Luz'
					type='text'
					maxLength={50}
				/>
				<HookFormController
					label='Email'
					name='email'
					control={form.control}
					placeholder='sinval@email.com'
					type='email'
					maxLength={100}
				/>
				<HookFormController
					label='Senha'
					name='password'
					control={form.control}
					placeholder='••••••••'
					type='password'
					maxLength={100}
				/>
				<HookFormController
					label='Confirmação de senha'
					name='confirmPassword'
					control={form.control}
					placeholder='••••••••'
					type='password'
					maxLength={100}
				/>
				<HookFormController
					label='Token de cadastro'
					name='registrationToken'
					control={form.control}
					placeholder='x3C908lxKyQ9'
					type='text'
					maxLength={100}
				/>
			</div>

			<Button
				type='submit'
				className='w-full p-4 h-auto font-bold cursor-pointer mt-2'
			>
				Criar conta
			</Button>

			<p className='text-end text-secondary-foreground text-sm'>
				Já tem uma conta?{' '}
				<Link
					to={paths.home.path}
					className='text-foreground font-bold'
				>
					Entrar
				</Link>
			</p>
		</form>
	);
}
