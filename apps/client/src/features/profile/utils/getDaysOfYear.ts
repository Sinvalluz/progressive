export default function getDaysOfYear(year: number) {
	const days = [];
	const date = new Date(year, 0, 1);
	let contador = 0;

	while (date.getFullYear() === year) {
		days.push({ id: contador, date: new Date(date) });
		date.setDate(date.getDate() + 1);
		contador++;
	}

	return days;
}
