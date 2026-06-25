import { AppSidebar } from '@/features/home/components/app-sidebar';
import HomeFooter from '@/features/home/components/footer';
import HomeHeader from '@/features/home/components/header';
import HomeMain from '@/features/home/components/main';

export default function HomeRoute() {
	return (
		<>
			<AppSidebar />
			<div className='min-h-screen w-full relative space-y-16'>
				<HomeHeader />
				<HomeMain />
				<HomeFooter />
			</div>
		</>
	);
}
