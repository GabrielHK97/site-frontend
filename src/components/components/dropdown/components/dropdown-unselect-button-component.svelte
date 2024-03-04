<script lang="ts">
	import { getContext } from 'svelte';
	import { DropdownOption } from '../classes/dropdown-option.class';
	import type { Writable } from 'svelte/store';
	import type { Dropdown } from '../classes/dropdown.class';
	import type { OnChangeFunction } from '../interfaces/on-change.interface';

	export let selectedOption = DropdownOption;
	let context = getContext<Writable<Dropdown>>('dropdown');
	let onChange = getContext<Writable<OnChangeFunction>>('onChange');

	function removeSelectedOption() {
		$context.value.splice($context.value.indexOf(selectedOption), 1);
		$context.value = [...$context.value];
	}

	$: $context.value && $onChange($context.value);
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
