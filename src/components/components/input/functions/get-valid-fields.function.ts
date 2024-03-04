import { getAllKeys } from '../../../functions/get-all-keys.function';
import { ValidFieldsObject } from '../classes/valid-fields-object.class';

function transformKeyToObject(obj: any, key: string): void {
	key.split('.').forEach((k, i) => {
		obj[k] = i < key.split('.').length - 1 
		? obj[key.split('.')[i]] 
			? obj[key.split('.')[i]]
			: {}
		: false
		if (obj) obj = obj[k];
	});
}


export function getValidFields(obj: any = {}): any {
	const keys = Object.entries(obj);
	let validFieldsObject: ValidFieldsObject = new ValidFieldsObject();
	keys.forEach((k: any) => {
		transformKeyToObject(validFieldsObject, k[0]);
	});	
	return validFieldsObject;
}
