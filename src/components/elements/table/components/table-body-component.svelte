<script lang="ts">
	import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
	import type { TableField } from '../classes/table-field.class';
	import { SortConstants } from '../../../constants/table.constants';
	import type { TableConfig } from '../classes/table-config.class';
	import { VarTypes } from '../../../constants/var-types.constants';
	import { faCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
	import { TableFunctions } from '../functions/table.functions';
	import Fa from 'svelte-fa/src/fa.svelte';

	export let tableConfig: TableConfig;
	export let viewSelectedRows: boolean;
	export let selectedRows: Array<any>;
	export let data: any;
	export let find: string;

	function sort(tableField: TableField<any>): void {
		tableField.sortOrder =
			tableField.sortOrder === SortConstants.UNSORTED
				? SortConstants.ASC
				: tableField.sortOrder === SortConstants.ASC
				? SortConstants.DESC
				: SortConstants.ASC;
		tableConfig.fields = [...tableConfig.fields];
	}

	function findData(str: string | number, subStr: string): any {
		let indexes: Array<any> = [];
		let index = 0;
		if (subStr) {
			while (str.toString().toLowerCase().indexOf(subStr.toLowerCase(), index) != -1) {
				const begin = str.toString().toLowerCase().indexOf(subStr.toLowerCase(), index);
				indexes.push({ begin, end: subStr.length + begin });
				index = str.toString().toLowerCase().indexOf(subStr.toLowerCase(), index) + 1;
			}
		}
		return str
			.toString()
			.split('')
			.map((char, i) => {
				return {
					char,
					highLight:
						indexes.filter((index) => {
							return i >= index.begin && i < index.end;
						}).length > 0
				};
			});
	}

	function selectRow(row: any): void {
		selectedRows =
			selectedRows.filter((r) => {
				return r.id === row.id;
			}).length > 0
				? [
						...selectedRows.filter((r) => {
							return r.id !== row.id;
						})
				  ]
				: [...selectedRows, row];
	}

	function isRowSelected(r: any): boolean {
		return (
			tableConfig.options.selectable &&
			selectedRows
				.map((rr) => {
					return rr.id === r.id;
				})
				.includes(true)
		);
	}

	$: localData = viewSelectedRows ? selectedRows : data?.items;
</script>

<table
	class="w-full table-auto {tableConfig.colors
		.background} scrollbar-thin overflow-auto border {tableConfig.colors.border} {tableConfig.colors
		.scrollbarTrack} {tableConfig.colors.scrollbarThumb}"
	style="border-collapse: collapse; border-style: hidden;"
>
	<thead class="{tableConfig.colors.header} text-md sticky top-0 h-12 p-2" style="z-index: 0">
		<tr>
			{#if tableConfig.fields}
				{#if tableConfig.options.selectable}
					<th class={tableConfig.options.selectableClass} style={tableConfig.colors.border}>
						<div class="flex flex-row items-center justify-center space-x-2 p-2">Select</div>
					</th>
				{/if}
				{#each tableConfig.fields as tableField}
					<th
						class={tableField.hidden ? 'hidden' : 'line'}
						on:click={() => sort(tableField)}
						style={tableConfig.colors.border}
					>
						<div class="flex flex-row items-center justify-center space-x-2 p-2">
							<div>{tableField.label}</div>

							{#if tableField.sortOrder === SortConstants.ASC}
								<Fa icon={faSortUp} />
							{:else if tableField.sortOrder === SortConstants.DESC}
								<Fa icon={faSortDown} />
							{:else}
								<Fa icon={faSort} />
							{/if}
						</div>
					</th>
				{/each}
				{#if tableConfig.options.actions}
					<th class={tableConfig.options.actionsClass} style={tableConfig.colors.border}>
						<div class="flex flex-row items-center justify-center space-x-2 p-2">Actions</div>
					</th>
				{/if}
			{/if}
		</tr>
	</thead>
	<tbody>
		{#if localData}
			{#each localData as row}
				<tr
					class="{isRowSelected(row)
						? tableConfig.colors.selected
						: tableConfig.colors.row} hover:{tableConfig.colors.hover} text-md h-12 p-2"
					on:click={() => {
						selectRow(row);
					}}
				>
					{#if tableConfig.options.selectable}
						<td class={tableConfig.options.selectableClass} style={tableConfig.colors.border}>
							<div class="flex flex-row items-center justify-center space-x-2 p-2">
								{#if isRowSelected(row)}
									<Fa icon={faCircleCheck} color="hsl(var(--nc))" />
								{:else}
									<Fa icon={faCircle} color="hsl(var(--nc))" />
								{/if}
							</div>
						</td>
					{/if}
					{#each tableConfig.fields as tableField}
						<td class={tableField.hidden ? 'hidden' : 'line'} style={tableConfig.colors.border}>
							<div
								class="p-2 {typeof TableFunctions.getProperty(tableField, row) === VarTypes.NUMBER
									? 'text-end'
									: tableField.mask
									? 'text-center'
									: 'text-start'}"
							>
								{#if TableFunctions.getProperty(tableField, row) != undefined}
									{#each findData(TableFunctions.getProperty(tableField, row), find) as character}
										<span class={character.highLight ? 'bg-primary' : null}>{character.char}</span>
									{/each}
								{/if}
							</div>
						</td>
					{/each}
					{#if tableConfig.options.actions}
						<td class={tableConfig.options.actionsClass} style={tableConfig.colors.border}>
							<slot name="actions" {row} />
						</td>
					{/if}
				</tr>
			{/each}
		{/if}
	</tbody>
</table>
