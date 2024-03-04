<script lang="ts">
	import type { ValidatingFunction } from '../interfaces/validating-function.interface';
	import { InputTypes } from '../constants/input-types.constants';
	import { InputMask } from '../functions/input-mask.function';

	export let type: InputTypes = InputTypes.TEXT;
	export let id: string = '';
	export let value: any = '';
	export let placeholder: string = '';
	export let valid: boolean = false;
	export let readonly: boolean = false;
	export let mask: string = '';
	export let required: boolean = true;
	export let validatingFunction: ValidatingFunction = () => {
		return true;
	};

	export let firstTime: boolean = true;
	export let maskedValue: any = '';

	const handleInput = (e: any) => {
		firstTime = false;
		maskedValue = type.match(/^(number|range)$/) ? +e.target.value : e.target.value;
		const inputMask =
			type === InputTypes.NUMBER_AS_TEXT
				? InputMask.mask(maskedValue, mask)
				: { value: maskedValue, maskedValue };
		value = inputMask.value;
		maskedValue = inputMask.maskedValue;
	};

	function validateField(): void {
		valid = required
			? validatingFunction(value) &&
				((value !== '' &&
					[
						InputTypes.TEXT,
						InputTypes.NUMBER_AS_TEXT,
						InputTypes.TEXTAREA,
						InputTypes.DATE,
						InputTypes.PASSWORD
					].includes(type)) ||
					(type === InputTypes.NUMBER && value !== 0))
			: true;
	}

	$: maskedValue = (
		type === InputTypes.NUMBER_AS_TEXT ? InputMask.mask(value, mask) : { value, maskedValue: value }
	).maskedValue;
	$: value && validateField();
	$: if (value) firstTime = false;
</script>

{#if type === InputTypes.TEXTAREA}
	<textarea
		{id}
		class={$$props.class}
		value={maskedValue}
		{placeholder}
		on:input={handleInput}
		{readonly}
		on:focusout={() => {
			validateField();
			firstTime = false;
		}}
		maxlength={mask && mask !== '' ? mask.split('').length : -1}
		autocomplete="off"
	/>
{:else}
	<input
		{id}
		class={`${$$props.class} ${
			firstTime ? '' : valid ? 'border-success border' : 'border-error border'
		}`}
		type={type === InputTypes.NUMBER_AS_TEXT ? InputTypes.TEXT : type}
		value={maskedValue}
		{placeholder}
		min={0}
		on:input={handleInput}
		{readonly}
		on:focusout={() => {
			validateField();
			firstTime = false;
		}}
		maxlength={mask && mask !== '' ? mask.split('').length : -1}
		autocomplete="off"
	/>
{/if}
