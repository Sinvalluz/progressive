import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { paths } from '@/config/path';

export default function HeroSection() {
	return (
		<section className='space-y-16'>
			<div className='space-y-3 animate-left'>
				<h2 className='font-bold text-foreground text-3xl lg:text-6xl'>
					Acompanhe sua evolução na academia de forma inteligente
				</h2>
				<p className='text-sm font-semibold text-secondary-foreground'>
					Registre cargas, organize seus treinos e visualize seu progresso físico em um único lugar.
				</p>
				<Button className='rounded-full px-5 py-2.5'>
					<Link to={paths.home.path}>Começar gratuitamente</Link>
				</Button>
			</div>
			<div className='w-full border border-border h-100 lg:h-175 flex items-center justify-center text-4xl lg:text-6xl text-center rounded-4xl animate-up'>
				Tela de exemplo da dashboard
			</div>
		</section>
	);
}
