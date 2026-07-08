import { useEffect } from 'react';
import { NavLink } from '@/components/nav-link';
import LogoWithName from '@/components/ui/logo-with-name';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { paths } from '@/config/path';

export function AppSidebar() {
	const { setOpen } = useSidebar();

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setOpen(false);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, [setOpen]);
	return (
		<Sidebar collapsible='offcanvas'>
			<SidebarHeader>
				<SidebarMenu className='flex'>
					<div className='flex px-2'>
						{/* <Logo className='h-8 w-auto' />
						<span className='self-end text-3xl leading-5 text-primary'>rogressive</span> */}
						<LogoWithName />
					</div>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<NavLink to={paths.home.path}>Início</NavLink>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<NavLink to={paths.home.path}>Sobre</NavLink>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<NavLink to={paths.home.path}>Login</NavLink>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									className='bg-primary text-primary-foreground'
								>
									<NavLink to={paths.auth.register.path}>Cadastro</NavLink>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
