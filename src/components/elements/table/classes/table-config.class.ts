import { TableColors } from './table-colors.class';
import type { TableField } from './table-field.class';
import { TableOptions } from './table-options.class';

export class TableConfig {
	name: string;
	fields: TableField<any>[];
	options: TableOptions;
	colors: TableColors;
	viewColumnsNumber: number;

	constructor(
		name: string,
		fields: TableField<any>[],
		options?: TableOptions,
		colors?: TableColors,
		viewColumnsNumber?: number
	) {
		this.name = name;
		this.fields = fields;
		this.options = options ?? new TableOptions('w-auto', 'w-auto', false, false, true, true);
		this.colors =
			colors ??
			new TableColors(
				'bg-primary',
				'bg-neutral',
				'bg-base-300',
				'bg-base-100',
				'bg-base-300',
				'bg-base-300',
				'border-neutral-content',
				'scrollbar-track-neutral-content',
				'scrollbar-thumb-primary'
			);

		this.viewColumnsNumber = viewColumnsNumber ?? 6;
	}
}
