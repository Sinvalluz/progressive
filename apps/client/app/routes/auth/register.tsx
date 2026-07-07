import AuthHeader from '@/features/auth/components/header';
import RegisterMain from '@/features/auth/register/components/main';

export default function RegisterRouter() {
	return (
		<div className='h-screen w-full lg:flex'>
			<div className='hidden lg:block flex-1'>
				<img
					src='/imagem-de-fundo.png'
					alt=''
					className='h-full w-full object-cover object-[0%_center]'
				/>
			</div>
			<section className='p-4 flex lg:w-112.5 flex-col h-full justify-between overflow-y-auto'>
				<AuthHeader />
				<RegisterMain />
			</section>
		</div>
	);
}
