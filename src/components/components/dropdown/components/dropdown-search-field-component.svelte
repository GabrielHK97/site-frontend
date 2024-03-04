<script lang="ts">
	import { DropdownOption } from '../classes/dropdown-option.class';

	export let filtered: DropdownOption[] = [];
	export let options: any = [];
	export let label: string = 'label';
	export let value: string = 'value';

	let searchTerm: string = '';
	let dropdownOptions: DropdownOption[];

	$: dropdownOptions = [
		...options.map((option) => {
			return new DropdownOption(option[label], option[value]);
		})
	];

	$: filtered = dropdownOptions;

	function filter() {
		filtered = searchTerm
			? [
					...dropdownOptions.filter((option) => {
						return option.label.includes(searchTerm);
					})
				]
			: [...dropdownOptions];
	}
</script>

<input class={$$props.class} bind:value={searchTerm} on:input={filter} />
