import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ModeToggle } from '@/components/mode-toggle';
import { NavLink } from '@/components/nav-link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/logo';
import LogoWithName from '@/components/ui/logo-with-name';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { paths } from '@/config/path';

export default function HomeHeader() {
	const [toggleLogo, SetToggleLogo] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				SetToggleLogo(true);
			} else {
				SetToggleLogo(false);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);
	return (
		<header className='flex px-4 lg:px-20 h-18 items-center justify-between border-b border-b-border text-primary fixed top-0 left-0 right-0 z-50 bg-background'>
			<SidebarTrigger
				className='cursor-pointer lg:hidden'
				size={'icon-lg'}
			/>
			<Link to={paths.home.path}>
				{toggleLogo ? <LogoWithName /> : <Logo className='lg:size-16' />}
				<h1 hidden>Progressive</h1>
			</Link>
			<nav className='flex items-center gap-2'>
				<div className='hidden lg:flex items-center gap-2'>
					<NavLink to={paths.home.path}>Início</NavLink>

					<NavLink to={paths.home.path}>Sobre</NavLink>
					<div className='bg-border h-6 w-0.5 '></div>
					<NavLink to={paths.home.path}>Login</NavLink>

					<Link to={paths.home.path}>
						<Button className='cursor-pointer font-semibold rounded-2xl text-secondary bg-primary px-3'>
							Cadastro
						</Button>
					</Link>
				</div>
				<ModeToggle />
			</nav>
		</header>
	);
}
