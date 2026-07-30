import { Activity } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import YearSelect from './year-select';

export default function ActivityCalendar() {
	return (
		<section className='p-4 border border-border rounded-lg flex gap-4'>
			<div className='flex-1 space-y-2.5'>
				<h2 className='flex gap-1 font-semibold'>
					<Activity />
					Atividade
				</h2>
				<Separator />
			</div>
			<YearSelect />
		</section>
	);
}
