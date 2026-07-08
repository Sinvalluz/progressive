import { Link } from 'react-router';
import { paths } from '@/config/path';
import Form from './form';

export default function RegisterMain() {
	return (
		<main className='space-y-8 flex-1 '>
			<div className='space-y-2'>
				<h1 className='font-bold text-[32px]'>Crie sua conta</h1>
				<p className='font-medium text-sm text-secondary-foreground'>
					Cadastre-se para acessar a plataforma e começar a utilizar todos os recursos.
				</p>
			</div>
			<Form />
			<p className='text-end text-secondary-foreground text-sm'>
				Já tem uma conta?{' '}
				<Link
					to={paths.auth.signIn.path}
					className='text-highlights font-bold'
				>
					Entrar
				</Link>
			</p>
		</main>
	);
}
