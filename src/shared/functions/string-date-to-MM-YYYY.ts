export function stringDateToMMYYYY(date: string): string {
	const d = date.split('-');
	return `${d[1]}/${d[0]}`;
}
