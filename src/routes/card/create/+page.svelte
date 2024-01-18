<script lang="ts">
	import '../../../app.css';
	import axios from 'axios';
	import { CardSetDto } from '../../../dto/card/card-set.dto';
	import type { CardFormatDto } from '../../../dto/card/card-format.dto';
	import type { CardTypeDto } from '../../../dto/card/card-type.dto';
	import type { CardSubtypeDto } from '../../../dto/card/card-subtype.dto';
	import { CreateCardDto } from '../../../dto/card/create-card.dto';
	import { CardColorDto } from '../../../dto/card/card-color.dto';
	import type { CardRarityDto } from '../../../dto/card/card-rarity.dto';
	import DefaultPage from '../../../pages/default-page.svelte';
	import type { CardRarityOfSetDto } from '../../../dto/card/card-rarity-of-set.dto';
	import { Data } from '../../../data/data';
	import { onMount } from 'svelte';
	import { DatabaseAxios } from '../../../axios/database-axios';
	import AuthenticateWidget from '../../../authenticate/authenticate-widget.svelte';

	let id: number = NaN;

	let createCardDto: CreateCardDto = new CreateCardDto();
	let message: string = '';
	let sets: CardSetDto[] = [];
	let formats: CardFormatDto[] = [];
	let types: CardTypeDto[] = [];
	let subtypes: CardSubtypeDto[] = [];
	let colors: CardColorDto[] = [];
	let rarities: CardRarityDto[] = [];
	let authenticate: boolean = false;

	let setIds: number[] = [];
	let formatIds: number[] = [];
	let typeIds: number[] = [];
	let subtypeIds: number[] = [];
	let colorIds: number[] = [];
	let rarityIds: any = {};

	function setIdToObject(e: any, array: any): void {
		createCardDto.sets = Array.from(e.target.selectedOptions).map((option: any) => {
			return array.filter((element: any) => {
				return element.id === option.__value;
			})[0];
		});
	}

	function formatsIdToObject(e: any, array: any): void {
		createCardDto.formats = Array.from(e.target.selectedOptions).map((option: any) => {
			return array.filter((element: any) => {
				return element.id === option.__value;
			})[0];
		});
	}

	function typesIdToObject(e: any, array: any): void {
		createCardDto.types = Array.from(e.target.selectedOptions).map((option: any) => {
			return array.filter((element: any) => {
				return element.id === option.__value;
			})[0];
		});
	}

	function subtypesIdToObject(e: any, array: any): void {
		createCardDto.subtypes = Array.from(e.target.selectedOptions).map((option: any) => {
			return array.filter((element: any) => {
				return element.id === option.__value;
			})[0];
		});
	}

	function colorsIdToObject(e: any, array: any): void {
		createCardDto.colors = Array.from(e.target.selectedOptions).map((option: any) => {
			return array.filter((element: any) => {
				return element.id === option.__value;
			})[0];
		});
	}

	function raritiesHasSet(rarities: CardRarityOfSetDto[], set: CardSetDto): boolean {
		return (
			rarities.filter((r) => {
				return r.set.name === set.name;
			}).length > 0
		);
	}

	function modifyRarity(e: any): void {
		const currentSetIds = Array.from(e.target.selectedOptions).map((option: any) => {
			return option.__value;
		});
		const setsToCreate = sets.filter((set) => currentSetIds.includes(set.id));
		createCardDto.sets = setsToCreate;
		const setsToDelete = sets.filter((set) => !setsToCreate.includes(set));
		setsToDelete.forEach((set) => {
			if (raritiesHasSet(createCardDto.rarities, set)) {
				createCardDto.rarities = createCardDto.rarities.filter((r) => {
					return r.set.name !== set.name;
				});
			}
		});
	}

	function setRarity(e: any, set: CardSetDto): void {
		const id = e.target.selectedOptions[0].__value;
		const rarity = rarities.filter((r) => {
			return r.id === id;
		})[0];
		raritiesHasSet(createCardDto.rarities, set)
			? createCardDto.rarities.forEach((r) => {
					if (r.set.name === set.name) {
						r.rarity = rarity;
					}
				})
			: createCardDto.rarities.push({ rarity, set });
		rarityIds[set.name] = id;
	}

	function isValid(): any {
		return (
			createCardDto.name &&
			createCardDto.cost &&
			createCardDto.sets.length > 0 &&
			createCardDto.formats.length > 0 &&
			createCardDto.rarities.length > 0 &&
			createCardDto.types.length > 0 &&
			createCardDto.subtypes.length > 0 &&
			createCardDto.colors.length > 0
		);
	}

	function create(): void {
		if (isValid()) {
			axios.defaults.baseURL = import.meta.env.VITE_API_URL;
			axios
				.post('/card', createCardDto, { withCredentials: true })
				.then((res) => {
					message = res.data.message;
				})
				.catch((e) => {
					message = e.response.data.message;
				});
		}
	}

	function update(): void {
		if (isValid()) {
			axios.defaults.baseURL = import.meta.env.VITE_API_URL;
			axios
				.patch(`/card/${id}`, createCardDto, { withCredentials: true })
				.then((res) => {
					message = res.data.message;
				})
				.catch((e) => {
					message = e.response.data.message;
				});
		}
	}

	async function getData(): Promise<void> {
		sets = await Data.getCardSets();
		formats = await Data.getCardFormats();
		types = await Data.getCardTypes();
		subtypes = await Data.getCardSubtypes();
		colors = await Data.getCardColors();
		rarities = await Data.getCardRarities();
		if (!id) {
			sets.forEach((set) => {
				rarityIds[set.name] = 0;
			});
		}
	}

	onMount(async () => {
		const params = new URLSearchParams(window.location.search);
		id = Number.parseInt(params.get('id') ?? '');
		if (id) {
			createCardDto = await DatabaseAxios.getAxios()
				.get(`/card/${id}`)
				.then((res) => {
					return res.data.data;
				});
			setIds = createCardDto.sets.map((set) => {
				return set.id;
			});
			formatIds = createCardDto.formats.map((format) => {
				return format.id;
			});
			typeIds = createCardDto.types.map((type) => {
				return type.id;
			});
			subtypeIds = createCardDto.subtypes.map((subtype) => {
				return subtype.id;
			});
			colorIds = createCardDto.colors.map((color) => {
				return color.id;
			});
			createCardDto.rarities.forEach((rarity) => {
				rarityIds[rarity.set.name] = rarity.rarity.id;
			});
		}
	});

	$: authenticate && getData();
</script>

<DefaultPage>
	<AuthenticateWidget bind:authenticate />
	<div class="flex w-full flex-grow justify-center items-center">
		<div class="card bg-base-300 shadow-xl">
			<div class="card-body justify-center items-center">
				<div class="card-title justify-center items-center text-md">{id ? 'Update' : 'Create'} Card</div>
				<div class="flex flex-row w-full space-x-4">
					<div class="flex flex-col w-full space-y-2">
						<label class="flex flex-col space-y-1 w-48">
							<div class="text-sm">Name</div>
							<input class="input input-sm w-full" bind:value={createCardDto.name} />
						</label>
						<label class="flex flex-col space-y-1 w-48">
							<div class="text-sm">Cost</div>
							<input class="input input-sm w-full" bind:value={createCardDto.cost} />
						</label>
						<label class="flex flex-col space-y-1 w-48">
							<div class="text-sm">Colors</div>
							<select
								multiple
								class="select select-sm w-full max-h-48"
								bind:value={colorIds}
								on:change={(e) => colorsIdToObject(e, colors)}
							>
								{#each colors as color}
									<option value={color.id}>{color.name}</option>
								{/each}
							</select>
						</label>
						<div class="flex flex-row space-x-8">
							<label class="flex flex-col space-y-1 w-20">
								<div class="text-sm">Attack</div>
								<input class="input input-sm w-full" bind:value={createCardDto.attack} />
							</label>
							<label class="flex flex-col space-y-1 w-20">
								<div class="text-sm">Defense</div>
								<input class="input input-sm w-full" bind:value={createCardDto.defense} />
							</label>
						</div>
						<label class="flex flex-col space-y-1 w-48">
							<div class="text-sm">Type</div>
							<select
								multiple
								class="select select-sm w-full max-h-48"
								bind:value={typeIds}
								on:change={(e) => typesIdToObject(e, types)}
							>
								{#each types as type}
									<option value={type.id}>{type.name}</option>
								{/each}
							</select>
						</label>
						<label class="flex flex-col space-y-1 w-48">
							<div class="text-sm">Subtypes</div>
							<select
								multiple
								class="select select-sm w-full max-h-48"
								bind:value={subtypeIds}
								on:change={(e) => subtypesIdToObject(e, subtypes)}
							>
								{#each subtypes as subtype}
									<option value={subtype.id}>{subtype.name}</option>
								{/each}
							</select>
						</label>
					</div>
					<div class="flex flex-col w-full space-y-2">
						<label class="flex flex-col space-y-1 w-48">
							<div class="text-sm">Sets</div>
							<select
								multiple
								class="select select-sm w-full max-h-48"
								bind:value={setIds}
								on:change={(e) => typesIdToObject(e, types)}
								on:change={(e) => modifyRarity(e)}
							>
								{#each sets as set}
									<option value={set.id}>{set.name}</option>
								{/each}
							</select>
						</label>
						{#if createCardDto.sets}
							{#each createCardDto.sets as set}
								<div class="flex flex-col space-y-2">
									<div>{set.name}</div>
									<select
										class="select select-sm w-full max-h-48"
										on:change={(e) => setRarity(e, set)}
										bind:value={rarityIds[set.name]}
									>
										<option selected disabled value={0}>Select value</option>
										{#each rarities as rarity}
											<option value={rarity.id}>{rarity.name}</option>
										{/each}
									</select>
								</div>
							{/each}
						{/if}
					</div>
					<div class="flex flex-col w-full space-y-2">
						<label class="flex flex-col space-y-1 w-48">
							<div class="text-sm">Formats</div>
							<select
								multiple
								class="select select-sm w-full max-h-48"
								bind:value={formatIds}
								on:change={(e) => formatsIdToObject(e, formats)}
							>
								{#each formats as format}
									<option value={format.id}>{format.name}</option>
								{/each}
							</select>
						</label>
						<label class="flex flex-col space-y-1 w-48 flex-grow">
							<div class="text-sm">Description</div>
							<textarea
								class="textarea textarea-bordered textarea-md h-full"
								bind:value={createCardDto.description}
							/>
						</label>
					</div>
				</div>
				<button
					class="btn btn-primary btn-sm w-24 text-neutral"
					on:click={() => {
						id ? update() : create();
					}}>{id ? 'Update' : 'Create'}</button
				>
				{message}
			</div>
		</div>
	</div>
</DefaultPage>
