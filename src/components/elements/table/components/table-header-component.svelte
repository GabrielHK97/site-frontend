<script lang="ts">
	import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import type { TableConfig } from '../classes/table-config.class';
	import { TableConstants } from '../../../constants/table.constants';
	import type { TableField } from '../classes/table-field.class';
	import type { Where } from '../classes/table-search.class';

	export let tableConfig: TableConfig;
	export let viewSelectedRows: boolean;
	export let where: Where = { field: '',operation: '=', value: '' };

	let expanded: boolean = false;
	function viewColumn(tableField: TableField<any>): void {
		tableField.hidden = !tableField.hidden;
		tableConfig.fields = [...tableConfig.fields];
	}
	$: tableFields = tableConfig.fields;
</script>

<div>
	<div class="{tableConfig.colors.body} flex h-fit w-full flex-col rounded-t-lg">
		<div class="flex h-12 w-full flex-row items-center justify-center space-x-2 p-2">
			{#if viewSelectedRows}
				<div class="flex-grow">Selected row(s) view mode</div>
			{:else}
				<input
					type="text"
					class="input input-sm flex-grow bg-neutral-content text-base-100"
					placeholder="Search"
					bind:value={where.value}
					readonly={where.field === TableConstants.EMPTY_STRING}
				/>
				<select class="select select-sm bg-neutral-content text-base-100" bind:value={where.field}>
					<option disabled selected>Select column</option>
					{#if tableFields}
						{#each tableFields as option}
							{#if !option.hidden}
								<option value={option.field}>{option.label}</option>
							{/if}
						{/each}
					{/if}
				</select>
			{/if}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="flex h-12 w-8 items-center justify-center"
				on:click={() => {
					expanded = !expanded;
				}}
			>
				<Fa icon={expanded ? faAngleUp : faAngleDown} />
			</div>
		</div>
		{#if expanded}
			<div
				class="grid h-fit items-center justify-center"
				style="grid-template-columns: repeat({tableConfig.viewColumnsNumber}, minmax(0, 1fr));"
			>
				{#if tableFields}
					{#each tableFields as tableField}
						<div class="text-md flex h-12 flex-row items-center justify-start space-x-2 p-2">
							<input
								type="checkbox"
								checked={!tableField.hidden}
								class="checkbox checkbox-xs"
								id={tableField.label}
								on:click={() => {
									viewColumn(tableField);
								}}
							/>
							<label for={tableField.label}>
								{tableField.label}
							</label>
						</div>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</div>
