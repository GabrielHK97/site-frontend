<script lang="ts">
	import '../../app.css';
	import type { TableFormatDto } from '../../dto/format/table-format.dto';
	import { booleanToYesOrNo } from '../../functions/boolean-to-yes-or-no';
	import { Data } from '../../data/data';
	import { goto } from '$app/navigation';
	import AuthenticatedPage from '../../pages/authenticated-page.svelte';

	let message: string = '';
	let data: TableFormatDto[] = [];
	let authenticate: boolean = false;

	async function getData() {
		data = await Data.getTableFormats();
	}

	function edit(id: number): void {
		goto(`/format/create?id=${id}`);
	}

	async function del(id: number): Promise<void> {
		await Data.deleteTableFormat(id);
		await getData();
	}

	function gotoCreate(): void {
		goto('/format/create');
	}

	$: authenticate && getData();
</script>

<AuthenticatedPage bind:authenticate pageName="Format" allowVisualization={true}>
	<div class="flex w-full flex-grow justify-center items-center">
		<div class="card bg-base-300 shadow-xl">
			<div class="card-body justify-center items-center">
				<div class="w-full card-title justify-center items-center">
					<div class="text-md">Formats</div>
					<div class="absolute right-8">
						<button class="btn btn-sm w-20 text-neutral btn-success" on:click={gotoCreate}
							>Create</button
						>
					</div>
				</div>
				<table class="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Rotate</th>
							<th>Description</th>
							<th>Active</th>
							{#if authenticate}
								<th>Actions</th>
							{/if}
						</tr>
					</thead>
					<tbody>
						{#each data as format}
							<tr>
								<td>{format.name}</td>
								<td>{booleanToYesOrNo(format.rotate)}</td>
								<td>{format.description}</td>
								<td>{booleanToYesOrNo(format.active)}</td>
								{#if authenticate}
									<td class="space-x-2">
										<button
											class="btn btn-info btn-sm w-20 text-neutral"
											on:click={() => edit(format.id)}
										>
											Edit
										</button>
										<button
											class="btn btn-error btn-sm w-20 text-neutral"
											on:click={() => del(format.id)}
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

