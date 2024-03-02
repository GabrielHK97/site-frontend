<script lang="ts">
	import { DropdownOption } from '../classes/dropdown-option.class';

	export let option: DropdownOption = new DropdownOption();
	export let selected: DropdownOption[] = [];

	function removeSelectedOption() {
		selected.splice(selected.indexOf(option), 1);
		selected = [...selected];
	}
</script>

<button
	class={$$props.class}
	on:click={(e) => {
		removeSelectedOption();
		e.stopPropagation();
	}}
>
	x
</button>
