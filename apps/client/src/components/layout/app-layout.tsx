import { Outlet } from 'react-router';
import AppSidebar from '../app-sidebar';
import { SidebarProvider } from '../ui/sidebar';

export default function AppLayout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className='p-16'>
				<Outlet />
			</main>
		</SidebarProvider>
	);
}
