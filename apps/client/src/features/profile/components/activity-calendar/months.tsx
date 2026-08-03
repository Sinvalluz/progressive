const months = ['jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export default function Months() {
	return (
		<div className='flex gap-16 ml-22'>
			{months.map((month) => {
				return (
					<p
						key={month}
						className='font-semibold text-sm whitespace-nowrap'
					>
						{month}
					</p>
				);
			})}
		</div>
	);
}
