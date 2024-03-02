export class DropdownOption<Type = any> {
	label: string;
	value: Type;

	constructor(label?: string, value?: Type) {
		this.label = label ?? '';
		this.value = value ?? ('' as any);
	}
}
