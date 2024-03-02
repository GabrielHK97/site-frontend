<script lang="ts">
	import '../../app.css';
	import type { TableSetDto } from '../../dto/set/table-set.dto';
	import { booleanToYesOrNo } from '../../functions/boolean-to-yes-or-no';
	import { stringDateToMMYYYY } from '../../functions/string-date-to-MM-YYYY';
	import { Data } from '../../data/data';
	import { goto } from '$app/navigation';
	import AuthenticatedPage from '../../pages/authenticated-page.svelte';
	import { onMount } from 'svelte';

	let message: string = '';
	let data: TableSetDto[] = [];
	let authenticated: boolean = false;

	async function getData() {
		data = await Data.getTableSets();
	}

	function edit(id: number): void {
		goto(`/set/create?id=${id}`);
	}

	async function del(id: number): Promise<void> {
		await Data.deleteTableSet(id);
		await getData();
	}

	function gotoCreate(): void {
		goto('/sets/create');
	}

	onMount(() => {
		getData();
	});
</script>

<AuthenticatedPage bind:authenticated allowVisualization={true}>
	<div class="flex w-full grow justify-center items-center">
		<div class="card bg-base-300 shadow-xl">
			<div class="card-body justify-center items-center">
				<div class="w-full card-title justify-center items-center">
					<div class="text-md">Sets</div>
					{#if authenticated}
						<div class="absolute right-8">
							<button class="btn btn-sm w-20 text-neutral btn-success" on:click={gotoCreate}
								>Create</button
							>
						</div>
					{/if}
				</div>
				<table class="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Code</th>
							<th>Release Date</th>
							<th>Description</th>
							<th>Active</th>
							{#if authenticated}
								<th>Actions</th>
							{/if}
						</tr>
					</thead>
					<tbody>
						{#each data as set}
							<tr>
								<td>{set.name}</td>
								<td>{set.code}</td>
								<td>{stringDateToMMYYYY(set.releaseDate.toString())}</td>
								<td class="w-96">{set.description}</td>
								<td>{booleanToYesOrNo(set.active)}</td>
								{#if authenticated}
									<td class="space-x-2">
										<button
											class="btn btn-info btn-sm w-20 text-neutral"
											on:click={() => edit(set.id)}
										>
											Edit
										</button>
										<button
											class="btn btn-error btn-sm w-20 text-neutral"
											on:click={() => del(set.id)}
										>
											Delete
										</button>
									</td>
								{/if}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</AuthenticatedPage>
