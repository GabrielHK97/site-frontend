<script lang="ts">
	import type { ValidatingFunction } from '../../../../shared/interfaces/validating-function.interface';
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

	function validateField(val: any): boolean {
		valid = required
			? validatingFunction(val) &&
				((val !== '' &&
					(type === InputTypes.TEXT ||
						type === InputTypes.NUMBER ||
						type === InputTypes.PASSWORD ||
						type === InputTypes.DATE)) ||
					(type === InputTypes.NUMBER_AS_TEXT && val !== 0))
			: true;
		return valid;
	}

	$: maskedValue = (
		type === InputTypes.NUMBER_AS_TEXT ? InputMask.mask(value, mask) : { value, maskedValue: value }
	).maskedValue;
	$: validateField(value);
	$: if (value) firstTime = false;
</script>

<input
	id={id}
	class={`${$$props.class} ${
		firstTime ? '' : valid ? 'border-success rounded-lg border' : 'border-error rounded-lg border'
	}`}
	type={type === InputTypes.NUMBER_AS_TEXT ? InputTypes.TEXT : type}
	value={maskedValue}
	{placeholder}
	min={0}
	on:input={handleInput}
	{readonly}
	on:focusout={() => {
		validateField(value);
		firstTime = false;
	}}
	maxlength={mask && mask !== '' ? mask.split('').length : -1}
	autocomplete="off"
/>
