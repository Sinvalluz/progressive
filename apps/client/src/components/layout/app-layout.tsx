import { Outlet } from 'react-router';
import AppHeader from '../app-header';
import AppSidebar from '../app-sidebar';
import { SidebarProvider } from '../ui/sidebar';

export default function AppLayout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className='w-full'>
				<AppHeader />
				<Outlet />
			</div>
		</SidebarProvider>
	);
}
