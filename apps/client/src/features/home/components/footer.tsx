import LogoWithName from '@/components/ui/logo-with-name';

export default function HomeFooter() {
	return (
		<footer className='border-t-2 border-border py-16 px-4 flex flex-col gap-12 lg:flex-row justify-between lg:items-center lg:px-28'>
			<div className='lg:max-w-50'>
				<LogoWithName />
				<p className='text-secondary-foreground'>
					Acompanhe sua evolução na academia através de registros de cargas, histórico de treinos e métricas
					de desempenho.
				</p>
			</div>
			<div className='flex justify-between lg:flex-col lg:justify-center lg:gap-4'>
				<h3 className='text-foreground font-semibold'>Produto</h3>
				<ul className='space-y-4 w-30'>
					<li className='text-secondary-foreground '>Funcionalidades</li>
					<li className='text-secondary-foreground'>Recursos</li>
					<li className='text-secondary-foreground'>Demonstração</li>
				</ul>
			</div>
			<div className='bg-border h-px lg:hidden'></div>
			<div className='flex justify-between lg:flex-col lg:justify-center lg:gap-4'>
				<h3 className='text-foreground font-semibold'>Contato</h3>
				<ul className='space-y-4 w-30'>
					<li className='text-secondary-foreground hover:text-foreground transition'>
						<a href='https://github.com/Sinvalluz'>GitHub</a>
					</li>
					<li className='text-secondary-foreground hover:text-foreground transition'>
						<a href='https://www.linkedin.com/in/sinval-luz-268707229/'>LinkedIn</a>
					</li>
					<li className='text-secondary-foreground hover:text-foreground transition'>
						<a href='mailto:contato.sinvalluz@gmail.com'>E-mail</a>
					</li>
				</ul>
			</div>
			<p className='text-center'>© 2026 Progressive. Desenvolvido por Sinval Luz.</p>
		</footer>
	);
}
