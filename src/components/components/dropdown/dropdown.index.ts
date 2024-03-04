import DropdownFieldComponent from './components/dropdown-field-component.svelte';
import DropdownLabelComponent from './components/dropdown-label-component.svelte';
import DropdownMenuComponent from './components/dropdown-menu-component.svelte';
import DropdownOptionComponent from './components/dropdown-option-component.svelte';
import DropdownRootComponent from './components/dropdown-root-component.svelte';
import DropdownSearchFieldComponent from './components/dropdown-search-field-component.svelte';
import DropdownSelectedOptionComponent from './components/dropdown-selected-option-component.svelte';
import DropdownUnselectButtonComponent from './components/dropdown-unselect-button-component.svelte';

export const Dropdown = {
	Root: DropdownRootComponent,
	Label: DropdownLabelComponent,
	Field: DropdownFieldComponent,
	Menu: DropdownMenuComponent,
	Option: DropdownOptionComponent,
	SearchField: DropdownSearchFieldComponent,
	SelectedOption: DropdownSelectedOptionComponent,
	UnselectButton: DropdownUnselectButtonComponent
};
