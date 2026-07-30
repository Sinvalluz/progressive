import ActivityCalendar from '@/features/profile/components/activity-calendar';
import Information from '@/features/profile/components/information';

export default function ProfileRoute() {
	return (
		<div className='p-4 lg:p-8 space-y-4'>
			<Information />
			<ActivityCalendar />
		</div>
	);
}
