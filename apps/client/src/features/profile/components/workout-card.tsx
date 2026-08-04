import { CircleChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type WorkoutCardProps = {
	title: string;
	date: Date;
	duration: string;
	volume: string;
	records: string;
	muscleGroups: string;
	exercises: {
		set: number;
		exercise: string;
	}[];
};

export default function WorkoutCard({
	title,
	date,
	duration,
	volume,
	records,
	muscleGroups,
	exercises,
}: WorkoutCardProps) {
	const [viewExercises, setViewExercises] = useState<boolean>(false);
	return (
		<div className='flex flex-col flex-1 gap-2.5 p-3 shadow-[0_4px_8px_rgba(0,0,0,0.25)] rounded-xl border border-border overflow-hidden'>
			<div className='flex flex-col gap-0.5'>
				<h3 className='font-semibold'>{title}</h3>
				<p className='font-light text-sm'>{date.toDateString()}</p>
			</div>
			<div className='flex justify-between items-center'>
				<div className='flex flex-col gap-1.5'>
					<span className='font-light text-xs'>Duração</span>
					<span>{duration}</span>
				</div>
				<div className='flex flex-col gap-1.5'>
					<span className='font-light text-xs'>Duração</span>
					<span>{volume}</span>
				</div>
				<div className='flex flex-col gap-1.5'>
					<span className='font-light text-xs'>Recordes</span>
					<div className='flex gap-1'>
						<img
							src='./trophy.svg'
							alt='Ícone de um troféu para indicar recordes'
						/>
						<span>{records}</span>
					</div>
				</div>
			</div>
			<div className='flex flex-col'>
				<h4>Grupos musculares:</h4>
				<span className='font-light text-xs'>{muscleGroups}</span>
			</div>
			<Separator />
			<div className='flex flex-col'>
				<button
					className='flex gap-1 select-none cursor-pointer'
					type='button'
					onClick={() => setViewExercises(!viewExercises)}
				>
					<CircleChevronUp
						className={cn(viewExercises ? 'rotate-180' : 'rotate-0', 'transition-transform duration-300')}
					/>
					Exercícios ({exercises.length})
				</button>

				<div
					className={cn(
						'overflow-hidden transition-all duration-300 ease-in-out',
						viewExercises ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2',
					)}
				>
					<div className='flex flex-col gap-2 pt-2'>
						{exercises.map((exercise) => (
							<span
								key={exercise.exercise}
								className='text-sm font-medium'
							>
								{exercise.set}x {exercise.exercise}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
