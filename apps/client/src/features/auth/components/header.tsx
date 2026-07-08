import { Link } from 'react-router';
import { ModeToggle } from '@/components/mode-toggle';
import Logo from '@/components/ui/logo';
import { paths } from '@/config/path';

export default function AuthHeader() {
	return (
		<header className='flex justify-between items-center'>
			<Link to={paths.home.path}>
				<Logo className='size-17.5 text-primary' />
			</Link>
			<ModeToggle />
		</header>
	);
}
