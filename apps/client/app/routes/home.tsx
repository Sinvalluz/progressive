import { AppSidebar } from '@/features/home/components/app-sidebar';
import HomeHeader from '@/features/home/components/header';
import HomeMain from '@/features/home/components/main';

export default function HomeRoute() {
	return (
		<>
			<AppSidebar />
			<div className='min-h-screen w-full relative'>
				<HomeHeader />
				<HomeMain />
			</div>
		</>
	);
}
