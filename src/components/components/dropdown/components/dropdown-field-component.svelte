<script lang="ts">
	import { getContext } from 'svelte';
	import { DropdownOption } from '../classes/dropdown-option.class';
	import type { Writable } from 'svelte/store';
	import type { Dropdown } from '../classes/dropdown.class';
	import type { OnChangeFunction } from '../interfaces/on-change.interface';

	let context = getContext<Writable<Dropdown>>('dropdown');
	let valid = getContext<Writable<boolean>>('valid');
	let onChange = getContext<Writable<OnChangeFunction>>('onChange');

	const handleInput = (e: any) => {
		$context.firstTime = false;
	};

	function expand(): void {
		if (!$context.readonly) {
			$context.firstTime = false;
			$context.expanded = !$context.expanded;
		}
	}

	function validateField(): void {
		$valid =
			((!$context.multiple && ($context.value as DropdownOption).value) ||
				($context.value as DropdownOption[]).length > 0) &&
			$context.required
				? true
				: false;
	}

	$: $context.value && validateField();
	$: $context.value && $onChange($context.value);
	$: hasContent = ($context.value as DropdownOption[]).length;
	$: value = ($context.value as DropdownOption).label ?? '';
</script>

<div class="w-full">
	{#if $context.multiple}
		<button
			class={$$props.class}
			on:focusout={() => {
				validateField();
				$context.firstTime = false;
			}}
			on:click={expand}
		>
			{#if hasContent === 0}
				{$context.placeholder}
			{:else}
				<slot name="selected" />
			{/if}
		</button>
	{:else}
		<input
			id={$context.label}
			class={$$props.class}
			type="text"
			placeholder={$context.placeholder}
			on:input={handleInput}
			readonly={$context.readonly}
			on:focusout={() => {
				validateField();
				$context.firstTime = false;
			}}
			on:click={expand}
			autocomplete="off"
			{value}
		/>
	{/if}
	<div class={`absolute ${$context.expanded ? 'block' : 'hidden'}`}>
		<slot name="options" />
	</div>
</div>
