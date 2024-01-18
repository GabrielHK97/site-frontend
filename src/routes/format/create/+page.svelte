<script lang="ts">
	import '../../../app.css';
	import axios from 'axios';
	import { CreateFormatDto } from '../../../dto/format/create-format.dto';
	import DefaultPage from '../../../pages/default-page.svelte';
	import AuthenticateWidget from '../../../authenticate/authenticate-widget.svelte';
	import { onMount } from 'svelte';
	import { DatabaseAxios } from '../../../axios/database-axios';

	let id: number = NaN;

	let createFormatDto: CreateFormatDto = new CreateFormatDto();
	let message: string = '';

	function isValid() {
		return createFormatDto.name && createFormatDto.rotate !== undefined;
	}

	function yes() {
		createFormatDto.rotate = true;
	}

	function no() {
		createFormatDto.rotate = false;
	}

	function create() {
		if (isValid()) {
			axios.defaults.baseURL = import.meta.env.VITE_API_URL;
			axios
				.post('/format', createFormatDto, { withCredentials: true })
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
				.patch(`/format/${id}`, createFormatDto, { withCredentials: true })
				.then((res) => {
					message = res.data.message;
				})
				.catch((e) => {
					message = e.response.data.message;
				});
		}
	}

	onMount(async () => {
		const params = new URLSearchParams(window.location.search);
		id = Number.parseInt(params.get('id') ?? '');
		if (id) {
			createFormatDto = await DatabaseAxios.getAxios()
				.get(`/format/${id}`)
				.then((res) => {
					return res.data.data;
				});
		}
	});
</script>

<DefaultPage>
	<AuthenticateWidget />
	<div class="flex w-full flex-grow justify-center items-center">
		<div class="card w-96 bg-base-300 shadow-xl">
			<div class="card-body justify-center items-center">
				<div class="card-title justify-center items-center text-md">{id ? 'Update' : 'Create'} Format</div>
				<label class="flex flex-col space-y-1 w-48">
					<div class="text-sm">Name</div>
					<input class="input input-sm w-full" bind:value={createFormatDto.name} />
				</label>
				<label class="flex flex-col space-y-1 w-48">
					<div class="text-sm">Rotates?</div>
					<label class="flex flex-row space-x-1">
						<div class="text-sm">Yes</div>
						<input
							class="radio radio-sm"
							type="radio"
							name="radio-0"
							on:change={yes}
							bind:group={createFormatDto.rotate}
							value={true}
						/>
					</label>
					<label class="flex flex-row space-x-1">
						<div class="text-sm">No</div>
						<input
							class="radio radio-sm"
							type="radio"
							name="radio-0"
							on:change={no}
							bind:group={createFormatDto.rotate}
							value={false}
						/>
					</label>
				</label>
				<label class="flex flex-col space-y-1 w-48">
					<div class="text-sm">Description</div>
					<textarea
						class="textarea textarea-bordered textarea-md"
						bind:value={createFormatDto.description}
					/>
				</label>
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
