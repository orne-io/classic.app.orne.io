export function truncate(text: string = '', [h, t]: [number, number] = [7, 6]): string {
	const head = text.slice(0, h);
	const tail = text.slice(-1 * t, text.length);
	return text.length > h + t ? [head, tail].join('...') : text;
}
