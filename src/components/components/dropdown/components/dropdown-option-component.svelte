<script lang="ts">
	import { DropdownOption } from '../classes/dropdown-option.class';

	export let selected: any = [];
	export let option: DropdownOption = new DropdownOption();
	export let multiple: boolean = false;

	let isSelected: boolean = false;

	function select(): void {
		if (multiple) {
			selected.includes(option)
				? selected.splice(selected.indexOf(option), 1)
				: selected.push(option);
			selected = [...selected];
		} else {
			selected = option;
		}
	}
</script>

<button
	class={$$props.class}
	on:click={() => {
		isSelected = !isSelected;
		select();
	}}
>
	{option.label}
</button>
