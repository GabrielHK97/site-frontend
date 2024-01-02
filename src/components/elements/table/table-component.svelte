<script lang="ts">
	import { SortConstants } from '../../constants/table.constants';
	import type { TableConfig } from './classes/table-config.class';
	import TableHeaderComponent from './components/table-header-component.svelte';
	import TableBodyComponent from './components/table-body-component.svelte';
	import TableFooterComponent from './components/table-footer-component.svelte';
	import { Search, Where } from './classes/table-search.class';
	import { Pagination } from './classes/table-pagination.class';

	export let tableConfig: TableConfig;
	export let search: Search = new Search();
	export let selectedRows: Array<any> = [];
	export let find: string = '';
	export let data: any;
	export let pagination: Pagination = new Pagination();

	let viewSelectedRows: boolean;
	let where: Where;

	function getSortOrder(localData: Array<any>, sortOrder: SortConstants, field: string) {
		if (sortOrder == SortConstants.ASC) {
			return localData.sort((a: any, b: any) => {
				return a[field].localeCompare(b[field]);
			});
		}
		if (sortOrder == SortConstants.DESC) {
			localData.sort((a: any, b: any) => {
				return b[field].localeCompare(a[field]);
			});
		}
	}

	function localSortData(localData: any): Array<any> {
		search.order.forEach((orderElement) => {
			localData = getSortOrder(localData, orderElement.sortOrder, orderElement.field);
		});
		return localData;
	}

	$: if (viewSelectedRows) localSortData(viewSelectedRows ? selectedRows : data);
	$: totalItems = data?.totalItems;
	$: where &&
		(search.where = [
			[
				{ field: where.field, operation: where.operation, value: where.value },
				{ field: 'active', operation: '=', value: true }
			]
		]);
</script>

<div class="flex h-full min-h-0 w-full flex-col items-center justify-start">
	<div class="flex h-full w-full flex-col">
		{#if tableConfig.name}
			<div class="mb-2 flex w-full items-center justify-center p-2 text-xl lg:h-10">
				{tableConfig.name}
			</div>
		{/if}
		{#if tableConfig.options.header}
			<TableHeaderComponent bind:tableConfig bind:where bind:viewSelectedRows />
		{/if}
		<div
			class="h-full w-full overflow-y-auto border border-neutral-content bg-neutral scrollbar-thin scrollbar-track-neutral-content scrollbar-thumb-primary"
		>
			<TableBodyComponent
				bind:tableConfig
				bind:selectedRows
				bind:find
				bind:data
				bind:viewSelectedRows
			>
				<slot slot="actions" name="actions" let:row {row} />
			</TableBodyComponent>
		</div>
		{#if tableConfig.options.footer}
			<TableFooterComponent
				bind:tableConfig
				bind:selectedRows
				bind:pagination
				bind:find
				bind:viewSelectedRows
				{totalItems}
			/>
		{/if}
	</div>
</div>
