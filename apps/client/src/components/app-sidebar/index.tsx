import { Dumbbell, LayoutDashboard, NotepadText, User } from 'lucide-react';
import { paths } from '@/config/path';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, useSidebar } from '../ui/sidebar';
import AppSidebarFooter from './app-sidebar-footer';
import AppSidebarHeader from './app-sidebar-header';
import NavItem from './nav-item';

const navItens = [
	{
		name: 'Dashboard',
		to: paths.dashboard.getHref(),
		icon: LayoutDashboard,
	},
	{
		name: 'Rotinas de treinos',
		to: paths.routines.getHref(),
		icon: NotepadText,
	},
	{
		name: 'Exercícios',
		to: paths.exercises.getHref(),
		icon: Dumbbell,
	},
	{
		name: 'Perfil',
		to: paths.profile.getHref(),
		icon: User,
	},
];

export default function AppSidebar() {
	const { state, toggleSidebar } = useSidebar();
	const collapsed = state === 'collapsed';
	return (
		<Sidebar
			collapsible='icon'
			variant='sidebar'
			className='border-r border-r-sidebar-border'
		>
			<AppSidebarHeader
				collapsed={collapsed}
				toggleSidebar={toggleSidebar}
			/>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{navItens.map((navItem) => {
								return (
									<NavItem
										name={navItem.name}
										collapsed={collapsed}
										to={navItem.to}
										icon={navItem.icon}
										key={navItem.name}
									/>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<AppSidebarFooter collapsed={collapsed} />
		</Sidebar>
	);
}
