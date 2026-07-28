import { ScrollArea } from '@/components/ui/scroll-area';
import AuthHeader from '@/features/auth/components/header';
import LoginMain from '@/features/auth/login/components/main';

export default function LoginRoute() {
	return (
		<div className='h-screen w-full lg:flex p-4 gap-4 box-border'>
			<section className='hidden lg:block flex-1 h-full bg-linear-to-br from-white via-highlights to-black rounded-2xl'></section>
			<ScrollArea className='flex-1 h-full overflow-y-auto '>
				<div className='p-4 lg:px-12 animate-up'>
					<AuthHeader />
					<LoginMain />
				</div>
			</ScrollArea>
		</div>
	);
}
