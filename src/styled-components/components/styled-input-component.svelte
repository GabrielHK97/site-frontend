<script lang="ts">
	import { Input as InputClass } from '../../components/components/input/classes/input.class';
	import { InputTypes } from '../../components/components/input/constants/input-types.constants';
	import { Input } from '../../components/components/input/input.index';
	export let props: InputClass = new InputClass();
	export let valid: boolean = false;
	export let type: InputTypes = InputTypes.TEXT;
	export let width: string = 'w-48';
	export let height: string = 'h-fit';
</script>

<Input.Root class="flex flex-col space-y-1 {width} {height}">
	<Input.Label label={props.label} class="text-sm" />
	<Input.Field
		id={props.label}
		bind:firstTime={props.firstTime}
		bind:value={props.value}
		bind:type
		bind:valid
		class={`input input-sm w-full min-h-8 h-full ${
			props.firstTime ? '' : valid ? 'border-success border' : 'border-error border'
		}`}
	/>
</Input.Root>
