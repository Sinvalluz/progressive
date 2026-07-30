import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const currentYear = new Date().getFullYear();
const years = [currentYear];

for (let i = 1; i < 4; i++) {
	years.push(currentYear - i);
}

export default function YearSelect() {
	const [yearSelected, setYearSelected] = useState<number>(currentYear);
	return (
		<div className='flex flex-col gap-4'>
			{years.map((year) => {
				return (
					<Button
						className={cn(
							'p-2 w-32 rounded-lg cursor-pointer',
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
