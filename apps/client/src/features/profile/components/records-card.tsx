const heavierExercises = [
	{
		exercise: 'Terra',
		weight: 2000,
		reps: 9,
	},
	{
		exercise: 'Agachamento barra',
		weight: 5000,
		reps: 7,
	},
	{
		exercise: 'Supino inclinado',
		weight: 1000,
		reps: 6,
	},
	{
		exercise: 'Elevação lateral na polia',
		weight: 5,
		reps: 24,
	},
	{
		exercise: 'Biceps com halter',
		weight: 60,
		reps: 12,
	},
];

export default function RecordsCard() {
	return (
		<div className='flex flex-col p-2.5 gap-2.5 shadow-[0_4px_8px_rgba(0,0,0,0.25)] rounded-xl border border-border order-1 md:order-2'>
			<div>
				<span className='block font-semibold'>🏆Recordes</span>
				<span className='block text-sm'>32</span>
			</div>
			<div>
				<span className='block font-semibold'>Último PR</span>
				<span className='block text-sm'>Ontem - supino reto - 50kg - 6reps</span>
			</div>
			<div className='min-w-0'>
				<span className='block font-semibold'>Exercícios mais fortes</span>
				<ol>
					{heavierExercises.map((value, index) => {
						return (
							<span
								className='block text-sm'
								key={value.exercise}
							>
								{index + 1}. {value.exercise} - {value.weight}kg - {value.reps}reps
							</span>
						);
					})}
				</ol>
			</div>
		</div>
	);
}
