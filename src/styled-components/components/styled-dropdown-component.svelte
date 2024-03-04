<script lang="ts">
	import type { DropdownOption } from '../../components/components/dropdown/classes/dropdown-option.class';
	import { Dropdown as DropdownClass } from '../../components/components/dropdown/classes/dropdown.class';
	import { Dropdown } from '../../components/components/dropdown/dropdown.index';
	export let props: DropdownClass = new DropdownClass();
	export let options: any = [];
	export let valid: boolean = false;
	export let label: string = 'label';
	export let value: string = 'value';
	export let width: string = 'w-48';

	function isSelected(options: DropdownOption[], option: any): boolean {
		return props.multiple ? options.includes(option) : options === option;
	}
</script>

<Dropdown.Root class="flex flex-col space-y-1 {width}" bind:expanded={props.expanded}>
	<Dropdown.Label label={props.label} class="text-sm" />
	<Dropdown.Field
		id={props.label}
		bind:firstTime={props.firstTime}
		bind:selected={props.value}
		bind:expanded={props.expanded}
		bind:valid
		multiple={props.multiple}
		class={`input input-sm w-full h-fit min-h-8 max-h-32 overflow-auto ${
			props.firstTime ? '' : valid ? 'border-success border' : 'border-error border'
		}`}
	>
		<div slot="selected" class="flex flex-row flex-wrap gap-2 p-2">
			{#each props.value as selectedColor}
				<Dropdown.SelectedOption
					class="bg-base-300 w-fit text-sm p-1 rounded-lg"
					option={selectedColor}
				>
					<Dropdown.UnselectButton option={selectedColor} bind:selected={props.value} />
				</Dropdown.SelectedOption>
			{/each}
		</div>
		<div slot="options">
			<Dropdown.Menu class="h-32 flex flex-col w-48 z-0 bg-base-100 overflow-auto rounded-lg border border-base-300">
				<Dropdown.SearchField
					class="input input-sm m-2 bg-base-300"
					{options}
					{label}
					{value}
					bind:filtered={props.filtered}
				/>
				{#each props.filtered as color}
					<Dropdown.Option
						multiple={props.multiple}
						option={color}
						bind:selected={props.value}
						class={isSelected(props.value, color) ? 'bg-primary' : ''}
					/>
				{/each}
			</Dropdown.Menu>
		</div>
	</Dropdown.Field>
</Dropdown.Root>
