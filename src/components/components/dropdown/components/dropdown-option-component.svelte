<script lang="ts">
	import { DropdownOption } from '../classes/dropdown-option.class';

	export let selected: DropdownOption[] = [];
	export let option: DropdownOption = new DropdownOption();

	let isSelected: boolean = false;

	function select(): void {
		selected.includes(option)
			? selected.splice(selected.indexOf(option), 1)
			: selected.push(option);
	}
</script>

<button
	class={$$props.class}
	on:click={() => {
		isSelected = !isSelected;
		select();
		selected = [...selected];
	}}
>
	{option.label}
</button>
