<script lang="ts">
	import '../../../app.css';
	import axios from 'axios';
	import { FormCardDto } from '../../../dto/card/form-card.dto';
	import { CardColorDto } from '../../../dto/card/card-color.dto';
	import { CardTypeDto } from '../../../dto/card/card-type.dto';
	import { CardSubtypeDto } from '../../../dto/card/card-subtype.dto';
	import { CardFormatDto } from '../../../dto/card/card-format.dto';
	import { CardSetDto } from '../../../dto/card/card-set.dto';
	import { CardRarityOfSetDto } from '../../../dto/card/card-rarity-of-set.dto';
	import { CardRarityDto } from '../../../dto/card/card-rarity.dto';
	import { Data } from '../../../data/data';
	import { onMount } from 'svelte';
	import { DatabaseAxios } from '../../../axios/database-axios';
	import AuthenticatedPage from '../../../pages/authenticated-page.svelte';
	import { getValidFields } from '../../../components/components/input/functions/get-valid-fields.function';
	import { InputTypes } from '../../../components/components/input/constants/input-types.constants';
	import { Styled } from '../../../styled-components/styled-components.index';
	import { DropdownOption } from '../../../components/components/dropdown/classes/dropdown-option.class';
	let id: number = NaN;

	let formCardDto: FormCardDto = new FormCardDto();
	formCardDto.name.label = 'Name';
	formCardDto.cost.label = 'Cost';
	formCardDto.attack.label = 'Attack';
	formCardDto.defense.label = 'Defense';
	formCardDto.description.label = 'Description';
	formCardDto.colors.multiple = true;
	formCardDto.types.multiple = true;
	formCardDto.subtypes.multiple = true;
	formCardDto.sets.multiple = true;
	formCardDto.formats.multiple = true;
	let cardValidator = getValidFields(formCardDto);

	let rarities: CardRarityOfSetDto[] = [];
	let raritiesValidator = getValidFields(rarities);

	let authenticated: boolean = false;

	let message: string = '';

	function isValid(): boolean {
		return cardValidator.isValid();
	}

	function create(): void {
		if (isValid()) {
			axios.defaults.baseURL = import.meta.env.VITE_API_URL;
			axios
				.post('/card', formCardDto, { withCredentials: true })
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
				.patch(`/card/${id}`, formCardDto, { withCredentials: true })
				.then((res) => {
					message = res.data.message;
				})
				.catch((e) => {
					message = e.response.data.message;
				});
		}
	}

	async function getData(): Promise<void> {
		formCardDto.sets.options = [
			...(await Data.getCardSets()).map((el) => {
				return new DropdownOption(el.name, el.id);
			})
		];
		formCardDto.formats.options = [
			...(await Data.getCardFormats()).map((el) => {
				return new DropdownOption(el.name, el.id);
			})
		];
		formCardDto.types.options = [
			...(await Data.getCardTypes()).map((el) => {
				return new DropdownOption(el.name, el.id);
			})
		];
		formCardDto.subtypes.options = [
			...(await Data.getCardSubtypes()).map((el) => {
				return new DropdownOption(el.name, el.id);
			})
		];
		formCardDto.colors.options = [
			...(await Data.getCardColors()).map((el) => {
				return new DropdownOption(el.name, el.id);
			})
		];
		formCardDto.rarities.options = [
			...(await Data.getCardRarities()).map((el) => {
				return new DropdownOption(el.name, el.id);
			})
		];
	}

	onMount(async () => {
		const params = new URLSearchParams(window.location.search);
		id = Number.parseInt(params.get('id') ?? '');
		if (id) {
			formCardDto = await DatabaseAxios.getAxios()
				.get(`/card/${id}`)
				.then((res) => {
					return res.data.data;
				});
		}
	});

	$: authenticated && getData();

	function raritiesHasSet(rarities: CardRarityOfSetDto[], set: CardSetDto): boolean {
		return (
			rarities.filter((r) => {
				return r.set.name === set.name;
			}).length > 0
		);
	}

	function setRarity(e: any, set: CardSetDto): void {
		console.log('hello');
		// context.value.includes(option)
		// 		? context.value.splice(context.value.indexOf(option), 1)
		// 		: context.value.push(option);
	}

	$: colors = formCardDto.colors.value.map((el) => {
		return new CardColorDto(el.value, el.label);
	});
	$: types = formCardDto.colors.value.map((el) => {
		return new CardTypeDto(el.value, el.label);
	});
	$: subtypes = formCardDto.colors.value.map((el) => {
		return new CardSubtypeDto(el.value, el.label);
	});
	$: formats = formCardDto.colors.value.map((el) => {
		return new CardFormatDto(el.value, el.label);
	});
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
						<Styled.Input props={formCardDto.name} bind:valid={cardValidator.name} />
						<Styled.Input props={formCardDto.cost} bind:valid={cardValidator.cost} />
						<Styled.Dropdown bind:props={formCardDto.colors} bind:valid={cardValidator.colors} />
						<div class="flex flex-row space-x-8">
							<Styled.Input
								width="w-20"
								props={formCardDto.attack}
								bind:valid={cardValidator.attack}
							/>
							<Styled.Input
								width="w-20"
								props={formCardDto.defense}
								bind:valid={cardValidator.defense}
							/>
						</div>
						<Styled.Dropdown bind:props={formCardDto.types} bind:valid={cardValidator.types} />
						<Styled.Dropdown
							bind:props={formCardDto.subtypes}
							bind:valid={cardValidator.subtypes}
						/>
					</div>
					<div class="flex flex-col w-full space-y-2">
						<Styled.Dropdown bind:props={formCardDto.sets} bind:valid={cardValidator.sets} />
						{#if formCardDto.sets}
							{#each formCardDto.sets.value as set}
								<div class="flex flex-col space-y-2">
									<div>{set.label}</div>
									<Styled.Dropdown
										bind:props={formCardDto.rarities}
										bind:valid={cardValidator.rarities}
										onChange={(selected) => {
											console.log(selected);
											setRarity(formCardDto.rarities.value, set);
										}}
									/>
								</div>
							{/each}
						{/if}
					</div>
					<div class="flex flex-col w-full space-y-2 h-full">
						<Styled.Dropdown bind:props={formCardDto.formats} bind:valid={cardValidator.formats} />
						<Styled.Input
							width="w-48"
							height="h-full"
							props={formCardDto.description}
							bind:valid={cardValidator.description}
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
