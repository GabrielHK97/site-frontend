export class DropdownOption {
    label?: string;
    value?: any;
    selected?: boolean = false;

    constructor(label?: string, value?: any, selected?: boolean) {
        this.label = label;
        this.value = value;
        this.selected = selected;
    }
}