import { Activity } from 'lucide-react';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Days from './days';
import DaysLabel from './days-label';
import Months from './months';
import YearSelect from './year-select';

export default function ActivityCalendar() {
	const currentYear = new Date().getFullYear();
	const [yearSelected, setYearSelected] = useState<number>(currentYear);

	return (
		<section className='p-4 flex flex-col border border-border rounded-lg gap-4 md:flex-row'>
			<div className='flex-1 min-w-0 space-y-2.5'>
				<h2 className='flex gap-1 font-semibold'>
					<Activity />
					Atividade
				</h2>
				<Separator className='w-full' />
				<ScrollArea className='max-w-7xl h-fit py-3'>
					<div className='flex flex-col gap-1 h-full'>
						<Months />
						<div className='flex gap-2'>
							<DaysLabel />
							<Days yearSelected={yearSelected} />
						</div>
					</div>
				</ScrollArea>
			</div>
			<YearSelect
				yearSelected={yearSelected}
				setYearSelected={setYearSelected}
				currentYear={currentYear}
			/>
		</section>
	);
}
