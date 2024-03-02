import { DropdownOption } from './dropdown-option.class';

export class Dropdown {
	label: string = '';
	value: any = {};
	placeholder: string = '';
	readonly: boolean = false;
	required: boolean = true;
	firstTime: boolean = true;
	expanded: boolean = false;
	filtered: DropdownOption[] = [];

	constructor(value?: any) {
		this.value = value;
	}
}
