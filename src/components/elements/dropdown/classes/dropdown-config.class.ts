import { DropdownColors } from './dropdown-colors.class';

export class DropdownConfig {
	name:string;
	colors: DropdownColors;

	constructor(name: string, colors?: DropdownColors) {
		this.name = name;
		this.colors = colors ?? new DropdownColors(
			'btn-primary',
			'bg-base-300',
			'bg-base-100',
			'bg-base-300',
			'border-neutral-content',
			'scrollbar-track-neutral-content',
			'scrollbar-thumb-primary'
		);
	}
}
