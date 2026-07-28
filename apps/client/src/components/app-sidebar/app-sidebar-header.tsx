import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarHeader } from '../ui/sidebar';

type AppSidebarHeaderProps = {
	collapsed: boolean;
	toggleSidebar: () => void;
};

export default function AppSidebarHeader({ collapsed, toggleSidebar }: AppSidebarHeaderProps) {
	return (
		<SidebarHeader
			className={cn('flex flex-row items-center', collapsed ? 'justify-center px-2' : 'justify-between')}
		>
			{collapsed ? (
				<PanelRightClose
					className='cursor-pointer size-4'
					strokeWidth={1.5}
					onClick={() => {
						toggleSidebar();
					}}
				/>
			) : (
				<>
					<img
						src='./logo-com-nome.svg'
						alt='logo com nome'
						loading='eager'
					/>
					<PanelRightOpen
						className='cursor-pointer size-4'
						strokeWidth={1.5}
						onClick={() => {
							toggleSidebar();
						}}
					/>
				</>
			)}
		</SidebarHeader>
	);
}
