import { ModeToggle } from '@/components/mode-toggle';
import Logo from '@/components/ui/logo';
import Form from './form';

export default function RegisterMain() {
	return (
		<main className='space-y-6 flex-1'>
			<div className='flex justify-between items-center'>
				<Logo className='size-17.5' />
				<ModeToggle />
			</div>
			<div className='space-y-2'>
				<h1 className='font-bold text-[32px]'>Crie sua conta</h1>
				<p className='font-medium text-sm text-secondary-foreground'>
					Cadastre-se para acessar a plataforma e começar a utilizar todos os recursos.
				</p>
			</div>
			<Form />
		</main>
	);
}
