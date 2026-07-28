import { useQueryClient } from '@tanstack/react-query';
import { CircleUserRound, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { paths } from '@/config/path';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import logout from '@/services/logout';
import { SidebarFooter } from '../ui/sidebar';

type AppSidebarFooterProps = {
	collapsed: boolean;
};
export default function AppSidebarFooter({ collapsed }: AppSidebarFooterProps) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { user, setUser } = useAuth();
	return (
		<SidebarFooter
			className={cn(
				'flex flex-row items-center border-t border-t-sidebar-border',
				collapsed ? 'justify-center' : 'justify-between',
			)}
		>
			<div className='flex items-center justify-center gap-1'>
				{user?.imgUrl ? (
					<img
						src={user.imgUrl}
						alt='Foto de perfil'
						width={32}
						height={32}
						className='rounded-full'
						loading='eager'
					/>
				) : (
					<CircleUserRound
						size={32}
						strokeWidth={1.5}
					/>
				)}

				{!collapsed && (
					<div>
						<span className='block font-medium text-ellipsis'>{user?.name}</span>
						<span className='block text-sm font-light text-ellipsis'>{user?.email}</span>
					</div>
				)}
			</div>

			{!collapsed && (
				<LogOut
					className='cursor-pointer'
					onClick={async () => {
						await logout();
						queryClient.clear();
						navigate(paths.auth.signIn.path);
						setUser(null);
					}}
				/>
			)}
		</SidebarFooter>
	);
}
