function getAllVariables<T extends object>(obj: T, variable: string = ''): any {
	return Object.entries(obj).reduce((result: string[], [key, value]) => {
		const newPrefix = {
			key: variable ? `${variable}.${key}` : key,
			isObject: typeof value === 'object'
		};

		return result
			.concat([
				newPrefix,
				...(typeof value === 'object' && value !== null
					? getAllVariables(value, newPrefix.key)
					: [])
			])
			.filter((obj: any) => {
				return !obj.isObject;
			});
	}, []);
}

export function getAllKeys(obj: any) {
	return getAllVariables(obj).map((obj: any) => {
		return obj.key;
	});
}