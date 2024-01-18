<script lang="ts">
	import '../../app.css';
	import type { TableCardDto } from '../../dto/card/table-card.dto';
	import DefaultPage from '../../pages/default-page.svelte';
	import { Data } from '../../data/data';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import MixedAuthenticateWidget from '../../authenticate/mixed-authenticate-widget.svelte';

	let message: string = '';
	let data: TableCardDto[] = [];
	let authenticate: boolean = false;

	async function getData(): Promise<void> {
		data = await Data.getTableCards();
	}

	function edit(id: number): void {
		goto(`/card/create?id=${id}`);
	}

	async function del(id: number): Promise<void> {
		await Data.deleteTableCard(id);
		await getData();
	}

	function gotoCreate(): void {
		goto('/card/create');
	}

	onMount(() => {
		getData();
	});
</script>

<DefaultPage>
	<MixedAuthenticateWidget bind:authenticate />
	<div class="flex w-full flex-grow min-h-max justify-center items-center">
		<div class="card bg-base-300 shadow-xl">
			<div class="card-body justify-center items-center">
				<div class="w-full card-title justify-center items-center">
					<div class="text-md">Card</div>
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
							{#if authenticate}
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
										<div>{rarity.rarity.name}</div>
									{/each}</td
								>
								<td class="space-y-1"
									>{#each card.sets as set}
										<div>{set.name}</div>
									{/each}</td
								>
								<td class="space-y-1"
									>{#each card.formats as format}
										<div>{format.name}</div>
									{/each}</td
								>
								<td class="w-96">{card.description ?? ''}</td>
								<td>{card.active}</td>
								{#if authenticate}
									<td class="space-x-2">
										<button
											class="btn btn-info btn-sm w-20 text-neutral"
											on:click={() => edit(card.id)}
										>
											Edit
										</button>
										<button
											class="btn btn-error btn-sm w-20 text-neutral"
											on:click={() => del(card.id)}
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
</DefaultPage>
