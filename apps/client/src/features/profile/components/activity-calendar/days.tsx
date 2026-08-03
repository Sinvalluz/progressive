import getDaysOfYear from '../../utils/getDaysOfYear';

export default function Days({ yearSelected }: { yearSelected: number }) {
	const daysOfYear = getDaysOfYear(yearSelected);
	const firstDayOffset = new Date(yearSelected, 0, 1).getDay();

	return (
		<div className='grid grid-rows-7 grid-flow-col gap-y-2 gap-x-1'>
			{Array.from({ length: firstDayOffset }).map((_, index) => {
				return (
					<div
						key={`empty-${
							// biome-ignore lint/suspicious/noArrayIndexKey: <Correct config in this situation>
							index
						}`}
						className='h-4 w-4'
					/>
				);
			})}
			{daysOfYear.map((dayOfYear) => {
				return (
					<div
						key={dayOfYear.id}
						className='h-4 w-4 border border-border rounded-xs'
					></div>
				);
			})}
		</div>
	);
}
