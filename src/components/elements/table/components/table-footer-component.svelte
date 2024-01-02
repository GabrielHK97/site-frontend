<script lang="ts">
	import {
		faForwardStep,
		faForward,
		faBackwardStep,
		faBackward,
		faEye,
		faEyeSlash,
		faClose,
		faTriangleExclamation
	} from '@fortawesome/free-solid-svg-icons';
	import type { TableConfig } from '../classes/table-config.class';
	import Fa from 'svelte-fa/src/fa.svelte';
	import type { Pagination } from '../classes/table-pagination.class';

	export let tableConfig: TableConfig;
	export let totalItems: number;
	export let selectedRows: Array<any>;
	export let pagination: Pagination;
	export let find: string;
	export let viewSelectedRows: boolean = false;

	function clearSelectedRows(): void {
		selectedRows = [];
		viewSelectedRows = false;
	}

	function toggleViewSelectedRows(): void {
		viewSelectedRows = !viewSelectedRows;
	}

	function backwardStep(): void {
		if (pagination.page - 1 > 0) pagination.page -= 1;
	}

	function backward(): void {
		pagination.page = 1;
	}

	function fowardStep(): void {
		if (pagination.page + 1 <= Math.ceil(totalItems / pagination.itemsPerPage))
			pagination.page += 1;
	}

	function foward(): void {
		pagination.page = Math.ceil(totalItems / pagination.itemsPerPage);
	}

	function resetPage(): void {
		pagination.page = pagination.page ? pagination.page : 1;
	}

	$: if (selectedRows.length < 1) viewSelectedRows = false;

	$: if(totalItems === 0) pagination.page = 0;
</script>

<div>
	{#if tableConfig.options.selectable && selectedRows.length > 0}
		<div
			class="{tableConfig.colors
				.body} flex h-12 w-full flex-row items-center justify-start space-x-4 p-2"
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={clearSelectedRows}>
				<Fa icon={faClose} />
			</div>
			<div class="flex flex-grow flex-row items-center justify-start space-x-2">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div on:click={toggleViewSelectedRows}>
					<Fa icon={viewSelectedRows ? faEyeSlash : faEye} />
				</div>
				<div>
					{selectedRows.length} row(s) selected
				</div>
			</div>
		</div>
	{/if}
	{#if viewSelectedRows}
		<div
			class="{tableConfig.colors
				.body} flex h-12 w-full flex-row items-center justify-start space-x-2 rounded-b-lg p-2"
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div>
				<Fa icon={faTriangleExclamation} color="hsl(var(--wa))" />
			</div>
			<div>WARNING: You are now viewing only the selected rows!</div>
		</div>
	{:else if pagination}
		<div class="{tableConfig.colors.body} flex h-12 w-full flex-row space-x-2 rounded-b-lg p-2">
			<div class="flex flex-col items-center justify-center">Items per page</div>
			<select
				class="select select-sm bg-neutral-content text-base-100"
				bind:value={pagination.itemsPerPage}
			>
				{#each pagination.optionsOfItemsPerPage as options}
					<option value={options}>{options}</option>
				{/each}
			</select>
			<div class="flex flex-col items-center justify-center">
				{pagination.getEntries(totalItems)} of {totalItems ? totalItems : 0}
			</div>
			<input
				type="text"
				class="input input-sm bg-neutral-content text-base-100 flex-grow"
				placeholder="Find"
				bind:value={find}
			/>
			<div class="flex flex-row items-center justify-center space-x-2">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div on:click={backward}>
					<Fa icon={faBackward} />
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div on:click={backwardStep}>
					<Fa icon={faBackwardStep} />
				</div>
				<div class="flex flex-row items-center justify-center space-x-2 text-sm">
					<div>Page</div>
					<input
						type="number"
						min={0}
						max={pagination.getPages(totalItems)}
						bind:value={pagination.page}
						class="input input-sm bg-neutral-content text-base-100 w-min"
						on:blur={resetPage}
						readonly={pagination.getPages(totalItems) === 0}
					/>
					<div>of {pagination.getPages(totalItems)}</div>
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div on:click={fowardStep}>
					<Fa icon={faForwardStep} />
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div on:click={foward}>
					<Fa icon={faForward} />
				</div>
			</div>
		</div>
	{/if}
</div>
