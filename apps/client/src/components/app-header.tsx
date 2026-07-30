import { useQueryClient } from '@tanstack/react-query';
import { CircleUserRound, PanelRightClose } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router';
import { paths } from '@/config/path';
import { useAuth } from '@/providers/auth-provider';
import logout from '@/services/logout';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useSidebar } from './ui/sidebar';

export default function AppHeader() {
	const { toggleSidebar } = useSidebar();
	const { user, setUser } = useAuth();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return (
		<header className='flex w-full h-18 items-center justify-between border-b border-border bg-background px-4 md:hidden'>
			<PanelRightClose
				className='cursor-pointer size-4'
				strokeWidth={1.5}
				onClick={() => {
					toggleSidebar();
				}}
			/>

			<div className='flex items-center gap-2'>
				<span className='block font-medium text-ellipsis'>{user?.name}</span>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
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
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuGroup>
							<DropdownMenuLabel>Minha conta</DropdownMenuLabel>
							<DropdownMenuItem>
								<NavLink to={paths.profile.getHref()}>Perfil</NavLink>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<NavLink to={paths.profile.getHref()}>Configurações</NavLink>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={async () => {
									await logout();
									queryClient.clear();
									navigate(paths.auth.signIn.path);
									setUser(null);
								}}
							>
								Sair
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
