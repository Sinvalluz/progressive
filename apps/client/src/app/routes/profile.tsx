import ActivityCalendar from '@/features/profile/components/activity-calendar';
import Information from '@/features/profile/components/information';
import RecordsCard from '@/features/profile/components/records-card';
import WorkoutCard from '@/features/profile/components/workout-card';

const exercises = [
	{
		set: 2,
		exercise: 'Supino reto barra',
	},
	{
		set: 2,
		exercise: 'Crucifixo polia alta',
	},
	{
		set: 2,
		exercise: 'Crucifixo polia baixa',
	},
	{
		set: 2,
		exercise: 'Elevação lateral na polia',
	},
	{
		set: 2,
		exercise: 'Desenvolvimento militar com halteres',
	},
	{
		set: 2,
		exercise: 'Triceps Polia com barra',
	},
	{
		set: 2,
		exercise: 'Abdominal máquina',
	},
];
export default function ProfileRoute() {
	return (
		<div className='p-4 lg:p-8 space-y-4'>
			<Information />
			<ActivityCalendar />
			<div className='flex flex-col md:flex-row gap-2.5 md:items-start'>
				<div className='flex-1 order-2 md:order-1 space-y-2.5'>
					<WorkoutCard
						title='Push'
						date={new Date()}
						duration='35 min'
						volume='4000kg'
						records='4'
						muscleGroups='Peito, ombros e triceps'
						exercises={exercises}
					/>
					<WorkoutCard
						title='Push'
						date={new Date()}
						duration='35 min'
						volume='4000kg'
						records='4'
						muscleGroups='Peito, ombros e triceps'
						exercises={exercises}
					/>
					<WorkoutCard
						title='Push'
						date={new Date()}
						duration='35 min'
						volume='4000kg'
						records='4'
						muscleGroups='Peito, ombros e triceps'
						exercises={exercises}
					/>
				</div>
				<RecordsCard />
			</div>
		</div>
	);
}
