import { Link } from 'react-router';
import { paths } from '@/config/path';
import LoginForm from './form';

export default function LoginMain() {
	return (
		<main className='space-y-8 flex-1'>
			<div className='space-y-2'>
				<h1 className='font-bold text-[32px]'>Bem-vindo de volta</h1>
				<p className='font-medium text-sm text-secondary-foreground'>
					Entre com suas credenciais para acessar o sistema.
				</p>
			</div>
			<LoginForm />
			<p className='text-end text-secondary-foreground text-sm'>
				Não possui conta?{' '}
				<Link
					to={paths.auth.signUp.path}
					className='text-highlights font-bold '
				>
					Cadastre-se
				</Link>
			</p>
		</main>
	);
}
