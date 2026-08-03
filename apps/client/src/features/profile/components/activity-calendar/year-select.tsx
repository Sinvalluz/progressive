import type { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type YearSelectProps = {
	currentYear: number;
	yearSelected: number;
	setYearSelected: Dispatch<SetStateAction<number>>;
};

export default function YearSelect({ currentYear, yearSelected, setYearSelected }: YearSelectProps) {
	const years = [currentYear];

	for (let i = 1; i < 4; i++) {
		years.push(currentYear - i);
	}
	return (
		<div className='flex flex-col gap-4'>
			{years.map((year) => {
				return (
					<Button
						className={cn(
							'p-2 w-full rounded-lg cursor-pointer md:w-32',
							year === yearSelected ? 'bg-primary' : 'bg-transparent text-foreground hover:text-white',
						)}
						key={year}
						onClick={() => {
							setYearSelected(year);
						}}
					>
						<span className='text-start w-full'>{year}</span>
					</Button>
				);
			})}
		</div>
	);
}
