<script lang="ts">
	import { getContext } from 'svelte';
	import { DropdownOption } from '../classes/dropdown-option.class';
	import type { Writable } from 'svelte/store';
	import type { Dropdown } from '../classes/dropdown.class';

	let searchTerm: string = '';

	let context = getContext<Writable<Dropdown>>('dropdown');

	$: $context.filtered = $context.options;

	function filter() {
		$context.filtered = searchTerm
			? [
					...$context.options.filter((option) => {
						return option.label.includes(searchTerm);
					})
				]
			: [...$context.options];
	}
</script>

<input class={$$props.class} bind:value={searchTerm} on:input={filter} />
