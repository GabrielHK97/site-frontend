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
	import { Data } from '../../../data/data';
	import { onMount } from 'svelte';
	import { DatabaseAxios } from '../../../axios/database-axios';
	import AuthenticatedPage from '../../../pages/authenticated-page.svelte';
	import InputRootComponent from '../../../components/components/input/components/input-root-component.svelte';
	import InputLabelComponent from '../../../components/components/input/components/input-label-component.svelte';
	import InputComponent from '../../../components/components/input/components/input-component.svelte';
	import { getValidFields } from '../../../components/components/input/functions/get-valid-fields.function';
	import { InputTypes } from '../../../components/components/input/constants/input-types.constants';
	import DropdownRootComponent from '../../../components/components/dropdown/components/dropdown-root-component.svelte';
	import DropdownLabelComponent from '../../../components/components/dropdown/components/dropdown-label-component.svelte';
	import DropdownComponent from '../../../components/components/dropdown/components/dropdown-component.svelte';
	import DropdownMenuComponent from '../../../components/components/dropdown/components/dropdown-menu-component.svelte';
	import DropdownOptionComponent from '../../../components/components/dropdown/components/dropdown-option-component.svelte';
	import { DropdownOption } from '../../../components/components/dropdown/classes/dropdown-option.class';
	import DropdownSelectedOptionComponent from '../../../components/components/dropdown/components/dropdown-selected-option-component.svelte';
	import DropdownUnselectButtonComponent from '../../../components/components/dropdown/components/dropdown-unselect-button-component.svelte';
	import DropdownSearchComponent from '../../../components/components/dropdown/components/dropdown-search-component.svelte';
	let id: number = NaN;

	let createCardDto: CreateCardDto = new CreateCardDto();
	createCardDto.name.label = 'Name';
	createCardDto.cost.label = 'Cost';
	createCardDto.attack.label = 'Attack';
	createCardDto.defense.label = 'Defense';
	createCardDto.colors.label = 'Colors';
	createCardDto.types.label = 'Types';
	createCardDto.subtypes.label = 'Subtypes';
	createCardDto.sets.label = 'Sets';
	createCardDto.rarities.label = 'Rarities';
	createCardDto.formats.label = 'Formats';
	createCardDto.description.label = 'Description';

	let cardValidator = getValidFields(createCardDto);

	let sets: CardSetDto[] = [];
	let formats: CardFormatDto[] = [];
	let types: CardTypeDto[] = [];
	let subtypes: CardSubtypeDto[] = [];
	let colors: CardColorDto[] = [];
	let rarities: CardRarityDto[] = [];

	let authenticated: boolean = false;

	let message: string = '';

	function isSelected(options: DropdownOption[], option: any): boolean {
		return options.includes(option);
	}

	function isValid(): boolean {
		return cardValidator.isValid();
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
		sets = [...(await Data.getCardSets())];
		formats = [...(await Data.getCardFormats())];
		types = [...(await Data.getCardTypes())];
		subtypes = [...(await Data.getCardSubtypes())];
		colors = [...(await Data.getCardColors())];
		console.log(colors);
		rarities = [...(await Data.getCardRarities())];
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
		}
	});

	$: authenticated && getData();
</script>

<AuthenticatedPage bind:authenticated>
	<div class="flex w-full grow justify-center items-center">
		<div class="card bg-base-300 shadow-xl">
			<div class="card-body justify-center items-center">
				<div class="card-title justify-center items-center text-md">
					{id ? 'Update' : 'Create'} Card
				</div>
				<div class="flex flex-row w-full space-x-4">
					<div class="flex flex-col w-full space-y-2">
						<InputRootComponent class="flex flex-col space-y-1 w-48">
							<InputLabelComponent label={createCardDto.name.label} class="text-sm" />
							<InputComponent
								id={createCardDto.name.label}
								bind:firstTime={createCardDto.name.firstTime}
								bind:valid={cardValidator.name}
								bind:value={createCardDto.name.value}
								class={`input input-sm w-full h-fit ${
									createCardDto.name.firstTime
										? ''
										: cardValidator.name
											? 'border-success border'
											: 'border-error border'
								}`}
							/>
						</InputRootComponent>
						<InputRootComponent class="flex flex-col space-y-1 w-48">
							<InputLabelComponent label={createCardDto.cost.label} class="text-sm" />
							<InputComponent
								id={createCardDto.cost.label}
								bind:firstTime={createCardDto.cost.firstTime}
								bind:valid={cardValidator.cost}
								bind:value={createCardDto.cost.value}
								class={`input input-sm w-full h-fit ${
									createCardDto.cost.firstTime
										? ''
										: cardValidator.cost
											? 'border-success border'
											: 'border-error border'
								}`}
							/>
						</InputRootComponent>
						<DropdownRootComponent
							class="flex flex-col space-y-1 w-48"
							bind:expanded={createCardDto.colors.expanded}
						>
							<DropdownLabelComponent label="Color" class="text-sm" />
							<DropdownComponent
								id={createCardDto.colors.label}
								bind:firstTime={createCardDto.colors.firstTime}
								bind:selected={createCardDto.colors.value}
								bind:expanded={createCardDto.colors.expanded}
								bind:valid={cardValidator.color}
								multiple={true}
								class={`input input-sm w-full h-fit min-h-8 ${
									createCardDto.colors.firstTime
										? ''
										: cardValidator.color
											? 'border-success border'
											: 'border-error border'
								}`}
							>
								<div slot="selected" class="flex flex-row flex-wrap gap-2 p-2">
									{#each createCardDto.colors.value as selectedColor}
										<DropdownSelectedOptionComponent
											class="bg-base-300 w-fit text-sm p-1 rounded-lg"
											option={selectedColor}
										>
											<DropdownUnselectButtonComponent
												option={selectedColor}
												bind:selected={createCardDto.colors.value}
											/>
										</DropdownSelectedOptionComponent>
									{/each}
								</div>
								<div slot="options">
									<DropdownMenuComponent
										class="h-32 flex flex-col w-48 z-0 bg-base-100 overflow-auto rounded-lg"
									>
										<DropdownSearchComponent
											class="input input-sm m-2 bg-base-300"
											options={colors}
											label="name"
											value="id"
											bind:filtered={createCardDto.colors.filtered}
										/>
										{#each createCardDto.colors.filtered as color}
											<DropdownOptionComponent
												option={color}
												bind:selected={createCardDto.colors.value}
												class={isSelected(createCardDto.colors.value, color) ? 'bg-primary' : ''}
											/>
										{/each}
									</DropdownMenuComponent>
								</div>
							</DropdownComponent>
						</DropdownRootComponent>
						<div class="flex flex-row space-x-8">
							<InputRootComponent class="flex flex-col space-y-1 w-20">
								<InputLabelComponent label={createCardDto.attack.label} class="text-sm" />
								<InputComponent
									id={createCardDto.attack.label}
									bind:firstTime={createCardDto.attack.firstTime}
									bind:valid={cardValidator.attack}
									bind:value={createCardDto.attack.value}
									required={false}
									class={`input input-sm w-full h-fit ${
										createCardDto.attack.firstTime
											? ''
											: cardValidator.attack
												? 'border-success border'
												: 'border-error border'
									}`}
								/>
							</InputRootComponent>
							<InputRootComponent class="flex flex-col space-y-1 w-20">
								<InputLabelComponent label={createCardDto.defense.label} class="text-sm" />
								<InputComponent
									id={createCardDto.defense.label}
									bind:firstTime={createCardDto.defense.firstTime}
									bind:valid={cardValidator.defense}
									bind:value={createCardDto.defense.value}
									required={false}
									class={`input input-sm w-full ${
										createCardDto.defense.firstTime
											? ''
											: cardValidator.defense
												? 'border-success border'
												: 'border-error border'
									}`}
								/>
							</InputRootComponent>
						</div>
						<!-- <label class="flex flex-col space-y-1 w-48">
							<div class="text-sm">Type</div>
							<select
								multiple
								class="select select-sm w-full"
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
						</label> -->
					</div>
					<div class="flex flex-col w-full space-y-2">
						<!-- <label class="flex flex-col space-y-1 w-48">
							<div class="text-sm">Sets</div>
							<select
								multiple
								class="select select-sm w-full"
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
							{#each createCardDto.sets.value as set}
								<div class="flex flex-col space-y-2">
									<div>{set.name}</div>
									<select
										class="select select-sm w-full"
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
						{/if} -->
					</div>
					<div class="flex flex-col w-full space-y-2">
						<!-- <label class="flex flex-col space-y-1 w-48">
							<div class="text-sm">Formats</div>
							<select
								multiple
								class="select select-sm w-full"
								bind:value={formatIds}
								on:change={(e) => formatsIdToObject(e, formats)}
							>
								{#each formats as format}
									<option value={format.id}>{format.name}</option>
								{/each}
							</select>
						</label> -->
						<InputRootComponent class="flex flex-col space-y-1 w-48 grow">
							<InputLabelComponent label={createCardDto.description.label} class="text-sm" />
							<InputComponent
								id={createCardDto.description.label}
								bind:firstTime={createCardDto.description.firstTime}
								bind:valid={cardValidator.description}
								bind:value={createCardDto.description.value}
								type={InputTypes.TEXTAREA}
								required={false}
								class={`textarea textarea-bordered textarea-md h-full ${
									createCardDto.description.firstTime
										? ''
										: cardValidator.description
											? 'border-success border'
											: 'border-error border'
								}`}
							/>
						</InputRootComponent>
					</div>
				</div>
				<button
					class="h-8 btn btn-primary btn-sm w-24 text-neutral text-md font-semibold"
					on:click={() => {
						id ? update() : create();
					}}
				>
					{id ? 'Update' : 'Create'}
				</button>
				{message}
			</div>
		</div>
	</div>
</AuthenticatedPage>
