import { AppSidebar } from '@/features/home/components/app-sidebar';
import HomeHeader from '@/features/home/components/header';

export default function HomeRoute() {
	return (
		<>
			<AppSidebar />
			<div className='min-h-screen w-full'>
				<HomeHeader />
			</div>
		</>
	);
}
