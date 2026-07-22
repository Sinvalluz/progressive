import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
import { Spinner } from '@/components/ui/spinner';
import { paths } from '@/config/path';
import HookFormController from '../../components/hook-form-controller';
import { LoginRequest } from '../services/login-request';
import { type LoginFormData, LoginFormSchema } from '../types/login-request-type';

export default function LoginForm() {
	const form = useForm<LoginFormData>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const navigate = useNavigate();

	const registering = useMutation({
		mutationFn: LoginRequest,
		onSuccess: () => {
			navigate(paths.dashboard.getHref());
		},
		onError: (error: AxiosError) => {
			console.error(error.response?.data);
		},
	});

	function onSubmit(data: LoginFormData) {
		registering.mutate(data);
		form.reset();
	}
	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className='space-y-4'
		>
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

			{registering.isError && (
				<p className='text-red-500 text-sm'>
					{(registering.error as AxiosError<{ message: string }>)?.response?.data?.message ??
						'Erro ao fazer login. Tente novamente mais tarde.'}
				</p>
			)}

			{/* Implementar depois */}
			{/* <div className='flex items-center gap-2.5'>
				<Checkbox className='border-border data-checked:border-highlights data-checked:bg-highlights data-checked:text-white	 dark:data-checked:bg-highlights' />
				<p className='font-medium text-[16px]'>Mantenha-me conectado</p>
			</div> */}

			<Button
				type='submit'
				className='w-full p-4 h-auto font-bold cursor-pointer mt-2 bg-highlights text-white hover:bg-highlights/80 shadow-md'
			>
				{registering.isPending ? <Spinner /> : 'Entrar'}
			</Button>
		</form>
	);
}
