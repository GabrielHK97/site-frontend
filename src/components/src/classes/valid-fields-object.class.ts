import { getAllKeys } from "../functions/get-all-keys.functions";

function getProperty(field: string, object: any): any {
	let property = object;
	field.split('.').forEach((k) => {
		if (property) property = property[k];
	});
	if (property != undefined) {
		return property;
	} else {
		return '';
	}
}

function setProperty(field: string, object: any, value: any): void {
	let property = object;
	field.split('.').forEach((k) => {
		if (property) property = property[k];
	});
	property = value;
}

export class ValidFieldsObject extends Object {
	isValid(): boolean {
		return getAllKeys(this)
			.map((key: any) => {
				return getProperty(key, this);
			})
			.includes(false)
			? false
			: true;
	}

	makeAllValid(): void {
		return getAllKeys(this).map((key: any) => {
			return setProperty(key, this, true);
		});
	}
}
