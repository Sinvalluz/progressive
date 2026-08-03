import { Outlet } from 'react-router';
import AppHeader from '../app-header';
import AppSidebar from '../app-sidebar';
import { SidebarProvider } from '../ui/sidebar';

export default function AppLayout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className='flex-1 min-w-0'>
				<AppHeader />
				<Outlet />
			</div>
		</SidebarProvider>
	);
}
