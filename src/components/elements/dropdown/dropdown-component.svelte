<script lang="ts">
	import { clickout } from './functions/use-directives.function';
	import { DropdownOption } from './dropdown-option';
	import type { DropdownConfig } from './classes/dropdown-config.class';

	export let numberOfOptions: number = 3;
	export let options: Array<any> = [];
	export let labelName: string = 'name';
	export let readOnly: boolean = false;
	export let value: DropdownOption = new DropdownOption();
	export let dropdownConfig: DropdownConfig;

	let expanded: boolean = false;
	let search: string = '';

	$: originalData = options.map((option: any) => {
		return new DropdownOption(option[labelName], option, false);
	});

	$: filteredData = originalData.filter((option: DropdownOption) => {
		return option.label?.includes(search);
	});

	function expand() {
		if (!readOnly) expanded = true;
	}

	function selectOption(op: any) {
		op.selected = true;
		expanded = false;
		value = op;
	}
</script>

<ul class="w-full">
	<li class="relative w-full">
		<div
			class="{dropdownConfig.colors
				.label} flex w-full flex-row items-center justify-center rounded-lg"
		>
			<div
				class="flex h-10 flex-col items-center justify-center pl-2 pr-2 {expanded
					? 'rounded-tl-lg'
					: 'rounded-l-lg'}"
			>
				{dropdownConfig.name}
			</div>
			<input
				class="input input-sm bg-neutral-content text-base-100 w-full rounded-none"
				placeholder="Select option"
				readonly
				bind:value={value.label}
				on:click={expand}
			/>
			<button
				class="{dropdownConfig.colors.button} btn btn-sm h-10 text-xs {expanded
					? 'rounded-none rounded-tr-lg'
					: 'rounded-l-none '}"
				on:click={expand}>Select</button
			>
		</div>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
			class="{dropdownConfig.colors
				.background} scrollbar-thin absolute w-full overflow-auto border {dropdownConfig.colors
				.border} {dropdownConfig.colors.scrollbarTrack} {dropdownConfig.colors.scrollbarThumb}"
			style="display: {expanded ? 'block' : 'none'}; max-height: {4 *
				12 *
				(numberOfOptions + 1)}px; z-index: 1"
			use:clickout
			on:clickout={() => {
				expanded = false;
			}}
		>
			{#if options}
				<table
					class="w-full table-auto"
					style="border-collapse: collapse; border-style: hidden;"
				>
					<thead class="text-md sticky top-0 h-12 p-2" style="z-index: 0">
						<tr>
							<th class="line">
								<div class="flex h-12 flex-row items-center justify-center p-2">
									<input
										type="text"
										class="input input-sm bg-neutral-content text-base-100 w-full"
										placeholder="Find"
										bind:value={search}
									/>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{#each filteredData as option}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<tr class="hover:{dropdownConfig.colors.hover} text-md h-12 p-2">
								<td on:click={() => selectOption(option)}>
									<div class="p-2">
										{option.label}
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>
	</li>
</ul>
