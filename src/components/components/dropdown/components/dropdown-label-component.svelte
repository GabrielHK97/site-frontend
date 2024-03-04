<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { Dropdown } from '../classes/dropdown.class';

	let context = getContext<Writable<Dropdown>>('dropdown');
</script>

<label for={$context.label} class={$$props.class}>{$context.label}</label>
