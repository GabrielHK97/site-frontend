import type { TableField } from "../classes/table-field.class";

export class TableFunctions {
	static getProperty(tableField: TableField<any>, object: any): any {
		let property = object;
		tableField.field.split('.').forEach((k) => {
			if (property) property = property[k];
		});
		if (property != undefined) {
			return tableField.mask ? tableField.mask(property) : property;
		} else {
			return '';
		}
		
	}
}
