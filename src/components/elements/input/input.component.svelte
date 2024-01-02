<script lang="ts">
	import { InputMask } from '../../src/functions/input-mask.function';
	import type { ValidatingFunction } from '../../src/interfaces/validating-function.interface';
	import { InputTypes } from './constants/input-types.constants';

	export let type: InputTypes = InputTypes.TEXT;
	export let label: string = '';
	export let value: any = '';
	export let placeholder: string = '';
	export let width: number = 0;
	export let valid: boolean = false;
	export let readonly: boolean = false;
	export let mask: string = '';
	export let required: boolean = true;
	export let className: string = '';
	export let validatingFunction: ValidatingFunction = () => {
		return true;
	};

	let firstTime: boolean = true;
	let maskedValue: string = '';

	const handleInput = (e: any) => {
		firstTime = false;
		maskedValue = type.match(/^(number|range)$/) ? +e.target.value : e.target.value;
		if (type === InputTypes.NUMBER_AS_TEXT) {
			const inputMask = InputMask.mask(maskedValue, mask);
			value = inputMask.value;
			maskedValue = inputMask.maskedValue;
		} else {
			value = maskedValue;
			maskedValue = maskedValue;
		}
	};

	function validateField(val: any): boolean {
		valid = required
			? validatingFunction(val) &&
				((val !== '' &&
					[InputTypes.TEXT, InputTypes.NUMBER, InputTypes.DATE, InputTypes.PASSWORD].includes(
						type
					)) ||
					(type === InputTypes.NUMBER_AS_TEXT && val !== 0))
			: true;
		return valid;
	}

	$: maskedValue =
		type === InputTypes.NUMBER_AS_TEXT ? InputMask.mask(value, mask).maskedValue : value;
	$: validateField(value);
	$: if (value) firstTime = false;
</script>

<div class="flex flex-col" style="width: {width > 0 ? `${width * 4}px` : `100%`}">
	<label for={label} class="flex w-full items-center justify-start">{label}</label>
	<div
		class="flex w-full flex-col items-center justify-center {firstTime
			? ''
			: validateField(value)
				? 'border-success rounded-lg border'
				: 'border-error rounded-lg border'}"
	>
		<input
			id={label}
			class={`text-neutral w-full ${className}`}
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
	</div>
</div>
