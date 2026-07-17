import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { paths } from '@/config/path';
import HookFormController from '../../components/hook-form-controller';
import { registerRequest } from '../services/register-request';
import { type RegisterFormData, RegisterFormSchema } from '../types/register-request-type';

export default function RegisterForm() {
	const form = useForm<RegisterFormData>({
		resolver: zodResolver(RegisterFormSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			registrationToken: '',
		},
	});

	const navigate = useNavigate();

	const registering = useMutation({
		mutationFn: registerRequest,
		onSuccess: () => {
			navigate(paths.home.getHref());
		},
		onError: (error: AxiosError) => {
			console.error(error.response?.data);
		},
	});

	function onSubmit(data: RegisterFormData) {
		registering.mutate(data);
		form.reset();
	}
	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className='space-y-4'
		>
			<HookFormController
				label='Nome de usuário'
				name='name'
				control={form.control}
				placeholder='Seu nome'
				type='text'
				maxLength={50}
			/>
			<HookFormController
				label='Email'
				name='email'
				control={form.control}
				placeholder='email@exemplo.com'
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
				placeholder='Insira o token de cadastro'
				type='text'
				maxLength={100}
			/>

			{registering.isError && (
				<p className='text-red-500 text-sm'>
					{(registering.error as AxiosError<{ message: string }>)?.response?.data?.message ??
						'Erro ao fazer o cadastro. Tente novamente mais tarde.'}
				</p>
			)}

			<Button
				type='submit'
				className='w-full p-4 h-auto font-bold cursor-pointer mt-2 bg-highlights text-white hover:bg-highlights/80 shadow-md'
			>
				{registering.isPending ? <Spinner /> : 'Criar conta'}
			</Button>
		</form>
	);
}
