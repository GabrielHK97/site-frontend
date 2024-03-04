<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { DropdownOption } from '../classes/dropdown-option.class';
	import type { Writable } from 'svelte/store';
	import type { Dropdown } from '../classes/dropdown.class';

	export let option: DropdownOption = new DropdownOption();

	let context = getContext<Writable<Dropdown>>('dropdown');

	let isSelected: boolean = false;

	function select(): void {
		if ($context.multiple) {
			$context.value.includes(option)
				? $context.value.splice($context.value.indexOf(option), 1)
				: $context.value.push(option);
			$context.value = [...$context.value];
		} else {
			$context.value = option;
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
