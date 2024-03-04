<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { clickout } from '../functions/use-directives.function';
	import { writable, type Writable } from 'svelte/store';
	import { Dropdown } from '../classes/dropdown.class';
	import type { DropdownOption } from '../classes/dropdown-option.class';
	import type { OnChangeFunction } from '../interfaces/on-change.interface';

	export let props: Dropdown = new Dropdown();
	export let valid: boolean;
	export let onChange: OnChangeFunction = (selected: DropdownOption) => {};
	setContext('label', writable<string>(''));
	setContext('dropdown', writable<Dropdown>(props));
	setContext('valid', writable<boolean>(valid));
	setContext('onChange', writable<OnChangeFunction>(onChange));
	let dropdownContext = getContext<Writable<Dropdown>>('dropdown');
	let validContext = getContext<Writable<boolean>>('valid');
	function retract() {
		$dropdownContext.expanded = false;
	}
	$: props = $dropdownContext;
	$: valid = $validContext;
</script>

<div class={$$props.class} use:clickout on:clickout={retract}>
	<slot />
</div>
