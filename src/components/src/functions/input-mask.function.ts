export class InputMask {
	static mask(value: string, mask: string): any {
		let maskChars = mask.split('').filter((char) => {
			return char.toLowerCase() !== 'x';
		});
		value = value ? value.toString().replace(/\D/g, '')
			.split('')
			.filter((char) => {
				return !maskChars.includes(char);
			})
			.join('') : '';
		if (mask === '') {
			return {value, maskedValue: value};
		} else {
			let displacement = 0;
			let maskedValue = mask
				.split('')
				.filter((char, i) => {
					if (mask.split('')[i].toLowerCase() !== 'x' && i < value.split('').length + displacement)
						displacement++;
					return i < value.split('').length + displacement;
				})
				.join('');
			displacement = 0;
			return {
				value,
				maskedValue: maskedValue
					.split('')
					.map((char, i) => {
						if (
							mask.split('')[i].toLowerCase() !== 'x' &&
							i < value.split('').length + displacement
						)
							displacement++;
						return char.toLowerCase() !== 'x' ? char : value.split('')[i - displacement];
					})
					.join('')
			};
		}
	}
}
