import type { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router';
import { cn } from '@/lib/utils';
import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';

type NavItemProps = {
	to: string;
	icon: LucideIcon;
	name: string;
	collapsed: boolean;
};

export default function NavItem({ to, icon: Icon, name, collapsed }: NavItemProps) {
	return (
		<SidebarMenuItem>
			<NavLink to={to}>
				{({ isActive }) => (
					<SidebarMenuButton
						isActive={isActive}
						tooltip={name}
						size='lg'
						className={cn(
							'[&_svg]:size-4 gap-2  cursor-pointer relative',
							collapsed ? 'justify-center' : 'justify-baseline',
							isActive &&
								'after:absolute after:right-0 after:top-2 after:bottom-2 after:w-1 after:rounded-l-[8px] bg-primary-hover after:bg-primary after:shadow-primary',
							'hover:bg-primary-hover',
						)}
					>
						<Icon />
						<span className={cn(collapsed ? 'hidden' : 'block')}>{name}</span>
					</SidebarMenuButton>
				)}
			</NavLink>
		</SidebarMenuItem>
	);
}
