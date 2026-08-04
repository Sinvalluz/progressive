import { CircleUserRound } from 'lucide-react';
import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider';

export default function Information() {
	const { user } = useAuth();
	return (
		<section className='p-4 border border-border rounded-lg flex flex-col gap-2 justify-between md:flex-row md:items-center shadow-[0_4px_8px_rgba(0,0,0,0.25)]'>
			<div className='flex flex-col gap-4 items-start md:flex-row md:gap-2.5'>
				{user?.imgUrl ? (
					<img
						src={user.imgUrl}
						alt='Foto de perfil'
						width={150}
						height={150}
						className='rounded-full self-center'
						loading='eager'
					/>
				) : (
					<CircleUserRound
						size={150}
						strokeWidth={1.5}
						className='self-center'
					/>
				)}

				<div className='space-y-4'>
					<h2 className='font-semibold text-2xl'>{user?.name}</h2>
					<div className=''>
						<span className='block'>Treinos</span>
						<span className='block'>0</span>
					</div>
				</div>
			</div>

			<Button
				className='cursor-pointer'
				asChild
			>
				<NavLink to={'/profile/edit'}>Editar perfil</NavLink>
			</Button>
		</section>
	);
}
