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
	import { getValidFields } from '../../../components/components/input/functions/get-valid-fields.function';
	import { InputTypes } from '../../../components/components/input/constants/input-types.constants';
	import { Styled } from '../../../styled-components/styled-components.index';
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
	createCardDto.formats.label = 'Formats';
	createCardDto.description.label = 'Description';

	createCardDto.colors.multiple = true;
	createCardDto.types.multiple = true;
	createCardDto.subtypes.multiple = true;
	createCardDto.sets.multiple = true;
	createCardDto.rarities.multiple = false;
	createCardDto.formats.multiple = true;

	let cardValidator = getValidFields(createCardDto);

	let sets: CardSetDto[] = [];
	let formats: CardFormatDto[] = [];
	let types: CardTypeDto[] = [];
	let subtypes: CardSubtypeDto[] = [];
	let colors: CardColorDto[] = [];
	let rarities: CardRarityDto[] = [];

	let authenticated: boolean = false;

	let message: string = '';

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

	$: console.log(createCardDto.sets.value);
</script>

<AuthenticatedPage bind:authenticated>
	<div class="flex w-full flex-1 flex-col p-12 min-h-0 justify-center items-center">
		<div class="card bg-base-300 shadow-xl min-h-0">
			<div class="card-body justify-center items-center">
				<div class="card-title justify-center items-center text-md">
					{id ? 'Update' : 'Create'} Card
				</div>
				<div class="flex flex-row w-full space-x-4">
					<div class="flex flex-col w-full space-y-2">
						<Styled.Input props={createCardDto.name} valid={cardValidator.name} />
						<Styled.Input props={createCardDto.cost} valid={cardValidator.cost} />
						<Styled.Dropdown
							bind:props={createCardDto.colors}
							bind:valid={cardValidator.colors}
							options={colors}
							label="name"
							value="id"
						/>
						<div class="flex flex-row space-x-8">
							<Styled.Input
								width="w-20"
								props={createCardDto.attack}
								valid={cardValidator.attack}
							/>
							<Styled.Input
								width="w-20"
								props={createCardDto.defense}
								valid={cardValidator.defense}
							/>
						</div>
						<Styled.Dropdown
							bind:props={createCardDto.types}
							bind:valid={cardValidator.types}
							options={types}
							label="name"
							value="id"
						/>
						<Styled.Dropdown
							bind:props={createCardDto.subtypes}
							bind:valid={cardValidator.subtypes}
							options={colors}
							label="name"
							value="id"
						/>
					</div>
					<div class="flex flex-col w-full space-y-2">
						<Styled.Dropdown
							bind:props={createCardDto.sets}
							bind:valid={cardValidator.sets}
							options={sets}
							label="name"
							value="id"
						/>
						{#if createCardDto.sets}
							{#each createCardDto.sets.value as set}
								<div class="flex flex-col space-y-2">
									<div>{set.label}</div>
									<Styled.Dropdown
										bind:props={createCardDto.rarities}
										bind:valid={cardValidator.rarities}
										options={rarities}
										label="name"
										value="id"
									/>
								</div>
							{/each}
						{/if}
					</div>
					<div class="flex flex-col w-full space-y-2 h-full">
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
						<Styled.Input
							width="w-48"
							height="h-full"
							props={createCardDto.description}
							valid={cardValidator.description}
							type={InputTypes.TEXTAREA}
						/>
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
