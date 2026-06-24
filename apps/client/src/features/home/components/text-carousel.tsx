const words = ['Evolução', 'Recordes', 'Cargas', 'Treinos', 'Metas', 'Estatísticas'];
const repeated = [...words, ...words, ...words, ...words, ...words, ...words];

export default function TextCarousel() {
	return (
		<section className='overflow-hidden w-full'>
			<div className='flex w-max track gap-32'>
				{repeated.map((word, i) => (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: <No problem, config default>
						key={i}
						className='px-6 py-2 text-2xl text-foreground font-semibold whitespace-nowrap select-none'
					>
						{word}
					</span>
				))}
			</div>
		</section>
	);
}
