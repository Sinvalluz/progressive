import { Link } from 'react-router';
import { cn } from '@/lib/utils';

interface NavLinkProps {
	to: string;
	children: React.ReactNode;
	className?: string;
}

export function NavLink({ to, children, className }: NavLinkProps) {
	return (
		<Link
			to={to}
			className={cn('px-3 py-1.5 text-secondary-foreground text-sm', className)}
		>
			{children}
		</Link>
	);
}
