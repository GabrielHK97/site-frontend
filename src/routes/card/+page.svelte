<script lang="ts">
	import '../../app.css';
	import type { TableCardDto } from '../../dto/card/table-card.dto';
	import { Data } from '../../data/data';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import AuthenticatedPage from '../../pages/authenticated-page.svelte';

	let message: string = '';
	let data: TableCardDto[] = [];
	let authenticated: boolean = false;
	let modal: HTMLDialogElement;
	let idToDelete: number;

	async function getData(): Promise<void> {
		data = await Data.getTableCards();
	}

	function edit(id: number): void {
		goto(`/card/create?id=${id}`);
	}

	async function showModal(id: number): Promise<void> {
		modal.showModal();
		idToDelete = id;
	}

	async function del(): Promise<void> {
		await Data.deleteTableCard(idToDelete);
		await getData();
	}

	function gotoCreate(): void {
		goto('/card/create');
	}

	onMount(() => {
		getData();
	});
</script>

<AuthenticatedPage bind:authenticated pageName="Card" allowVisualization={true}>
	<div class="flex min-h-0 w-full flex-col p-2 h-full">
		<div class="flex flex-col min-h-0 space-y-2 card bg-base-300 p-2">
			<div class="w-full h-8 card-title justify-center items-center">
				<div class="text-md">Card</div>
				{#if authenticated}
					<div class="absolute right-2">
						<button class="btn btn-sm w-20 text-neutral btn-success" on:click={gotoCreate}
							>Create</button
						>
					</div>
				{/if}
			</div>
			<div class="flex w-full flex-1 flex-col overflow-auto">
				<table class="table table-pin-rows">
					<thead>
						<tr>
							<th>Name</th>
							<th>Cost</th>
							<th>Colors</th>
							<th>Stats</th>
							<th>Type</th>
							<th>Subtype</th>
							<th>Rarities</th>
							<th>Sets</th>
							<th>Formats</th>
							<th>Description</th>
							<th>Active</th>
							{#if authenticated}
								<th>Actions</th>
							{/if}
						</tr>
					</thead>
					<tbody>
						{#each data as card}
							<tr>
								<td>{card.name}</td>
								<td>{card.cost}</td>
								<td class="space-y-1"
									>{#each card.colors as color}
										<div>{color.name}</div>
									{/each}</td
								>
								<td
									>{#if card.attack && card.defense}
										{card.attack}/{card.defense}
									{/if}</td
								>
								<td class="space-y-1"
									>{#each card.types as type}
										<div>{type.name}</div>
									{/each}</td
								>
								<td class="space-y-1"
									>{#each card.subtypes as subtype}
										<div>{subtype.name}</div>
									{/each}</td
								>
								<td class="space-y-1"
									>{#each card.rarities as rarity}
										<div>
											{rarity.set.code} - {rarity.rarity.name}
										</div>
									{/each}</td
								>
								<td class="space-y-1"
									>{#each card.sets as set}
										<div>{set.code} - {set.name}</div>
									{/each}</td
								>
								<td class="space-y-1"
									>{#each card.formats as format}
										<div>{format.name}</div>
									{/each}</td
								>
								<td class="w-96 whitespace-pre-line">{card.description ?? ''}</td>
								<td>{card.active}</td>
								{#if authenticated}
									<td class="space-x-2">
										<button
											class="btn btn-info btn-sm w-20 text-neutral"
											on:click={() => edit(card.id)}
										>
											Edit
										</button>
										<button
											class="btn btn-error btn-sm w-20 text-neutral"
											on:click={() => showModal(card.id)}
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

<dialog bind:this={modal} class="modal">
	<div class="modal-box">
		<p class="py-4">Are you sure?</p>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-sm btn-success text-md text-neutral font-semibold" on:click={del}>
					Confirm
				</button>
				<button class="btn btn-sm btn-error text-md text-neutral font-semibold">Cancel</button>
			</form>
		</div>
	</div>
</dialog>
