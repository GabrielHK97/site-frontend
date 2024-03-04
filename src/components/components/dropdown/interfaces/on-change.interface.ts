import type { DropdownOption } from "../classes/dropdown-option.class";

export interface OnChangeFunction {
 (dropdownOption: DropdownOption): void;
}