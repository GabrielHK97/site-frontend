<script lang="ts">
	import { onMount } from 'svelte';
	import { DropdownOption } from '../classes/dropdown-option.class';

	export let id: string = '';
	export let firstTime: boolean = true;
	export let placeholder: string = '';
	export let valid: boolean = false;
	export let readonly: boolean = false;
	export let selected: DropdownOption | DropdownOption[] = new DropdownOption();
	export let multiple: boolean = false;
	export let required: boolean = true;
	export let expanded: boolean = false;

	const handleInput = (e: any) => {
		firstTime = false;
	};

	function expand(): void {
		if (!readonly) {
			firstTime = false;
			expanded = !expanded;
		}
	}

	function validateField(): void {
		valid =
			((!multiple && (selected as DropdownOption).value) ||
				(selected as DropdownOption[]).length > 0) &&
			required
				? true
				: false;
	}

	$: selected && validateField();
	$: hasContent = (selected as DropdownOption[]).length;
	$: value = (selected as DropdownOption).label ?? '';
</script>

<div class="w-full">
	{#if multiple}
		<button
			class={$$props.class}
			on:focusout={() => {
				validateField();
				firstTime = false;
			}}
			on:click={expand}
		>
			{#if hasContent === 0}
				{placeholder}
			{:else}
				<slot name="selected" />
			{/if}
		</button>
	{:else}
		<input
			{id}
			class={$$props.class}
			type="text"
			{placeholder}
			on:input={handleInput}
			{readonly}
			on:focusout={() => {
				validateField();
				firstTime = false;
			}}
			on:click={expand}
			autocomplete="off"
			{value}
		/>
	{/if}
	<div class={`absolute ${expanded ? 'block' : 'hidden'}`}>
		<slot name="options" />
	</div>
</div>
