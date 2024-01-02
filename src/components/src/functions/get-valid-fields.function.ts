import { ValidFieldsObject } from '../classes/valid-fields-object.class';
import { getAllKeys } from './get-all-keys.functions';

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


export function getValidFields(obj: Object): any {
	const keys = getAllKeys(obj);
	let validFieldsObject: ValidFieldsObject = new ValidFieldsObject();
	keys.forEach((k: any) => {
		transformKeyToObject(validFieldsObject, k);
	});	
	return validFieldsObject;
}
