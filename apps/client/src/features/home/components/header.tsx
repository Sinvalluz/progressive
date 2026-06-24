import { Link } from 'react-router';
import { ModeToggle } from '@/components/mode-toggle';
import { NavLink } from '@/components/nav-link';
import Logo from '@/components/ui/logo';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { paths } from '@/config/path';

export default function HomeHeader() {
	return (
		<header className='flex px-4 lg:px-20 h-18 items-center justify-between border-b border-b-border text-primary fixed top-0 left-0 right-0 z-50'>
			<SidebarTrigger
				className='cursor-pointer lg:hidden'
				size={'icon-lg'}
			/>
			<Link to={paths.home.path}>
				<Logo className='lg:size-16' />
			</Link>
			<nav className='flex items-center gap-2'>
				<div className='hidden lg:flex items-center gap-2'>
					<NavLink to={paths.home.path}>Início</NavLink>

					<NavLink to={paths.home.path}>Sobre</NavLink>
					<div className='bg-border h-6 w-0.5 '></div>
					<NavLink to={paths.home.path}>Login</NavLink>

					<NavLink
						to={paths.home.path}
						className='bg-primary text-secondary rounded-2xl'
					>
						Cadastro
					</NavLink>
				</div>
				<ModeToggle />
			</nav>
		</header>
	);
}
