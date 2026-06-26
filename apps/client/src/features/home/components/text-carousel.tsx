export default function TextCarousel() {
	return (
		<section className='flex overflow-x-auto scrollbar-none'>
			<div
				className='flex items-center justify-center gap-16 lg:gap-52 animate-carousel pr-16 lg:pr-52'
				aria-hidden
			>
				<div className='text-foreground font-semibold text-2xl'>Evolução</div>
				<div className='text-foreground font-semibold text-2xl'>Recordes</div>
				<div className='text-foreground font-semibold text-2xl'>Cargas</div>
				<div className='text-foreground font-semibold text-2xl'>Treinos</div>
				<div className='text-foreground font-semibold text-2xl'>Metas</div>
				<div className='text-foreground font-semibold text-2xl'>Estatísticas</div>
			</div>
			<div
				className='flex items-center justify-center gap-16 lg:gap-52 animate-carousel pr-16 lg:pr-52'
				aria-hidden
			>
				<div className='text-foreground font-semibold text-2xl'>Evolução</div>
				<div className='text-foreground font-semibold text-2xl'>Recordes</div>
				<div className='text-foreground font-semibold text-2xl'>Cargas</div>
				<div className='text-foreground font-semibold text-2xl'>Treinos</div>
				<div className='text-foreground font-semibold text-2xl'>Metas</div>
				<div className='text-foreground font-semibold text-2xl'>Estatísticas</div>
			</div>
		</section>
	);
}
