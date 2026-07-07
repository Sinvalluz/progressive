import { ModeToggle } from '@/components/mode-toggle';
import Logo from '@/components/ui/logo';

export default function AuthHeader() {
	return (
		<header className='flex justify-between items-center'>
			<Logo className='size-17.5 text-primary' />
			<ModeToggle />
		</header>
	);
}
