const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

export default function DaysLabel() {
	return (
		<div className='flex w-10 shrink-0 flex-col gap-2'>
			{daysOfWeek.map((dayOfWeek) => {
				return (
					<p
						key={dayOfWeek}
						className='flex h-4 items-center font-semibold text-sm'
					>
						{dayOfWeek}
					</p>
				);
			})}
		</div>
	);
}
