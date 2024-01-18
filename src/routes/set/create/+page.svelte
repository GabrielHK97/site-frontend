<script lang="ts">
	import '../../../app.css';
	import axios from 'axios';
	import { CreateSetDto } from '../../../dto/set/create-set.dto';
	import DefaultPage from '../../../pages/default-page.svelte';
	import AuthenticateWidget from '../../../authenticate/authenticate-widget.svelte';
	import { DatabaseAxios } from '../../../axios/database-axios';
	import { onMount } from 'svelte';

	let id: number = NaN;

	let createSetDto: CreateSetDto = new CreateSetDto();
	let message: string = '';

	function isValid() {
		return createSetDto.name && createSetDto.code && createSetDto.releaseDate;
	}

	function create() {
		if (isValid()) {
			axios.defaults.baseURL = import.meta.env.VITE_API_URL;
			createSetDto.releaseDate = `${createSetDto.releaseDate}-01`;
			axios
				.post('/set', createSetDto, { withCredentials: true })
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
			createSetDto.releaseDate = `${createSetDto.releaseDate}-01`;
			axios
				.patch(`/set/${id}`, createSetDto, { withCredentials: true })
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
			createSetDto = await DatabaseAxios.getAxios()
				.get(`/set/${id}`)
				.then((res) => {
					return res.data.data;
				});
			createSetDto.releaseDate = `${createSetDto.releaseDate.split('-')[0]}-${
				createSetDto.releaseDate.split('-')[1]
			}`;
		}
	});
</script>

<DefaultPage>
	<AuthenticateWidget />
	<div class="flex w-full flex-grow justify-center items-center">
		<div class="card bg-base-300 shadow-xl">
			<div class="card-body justify-center items-center">
				<div class="card-title justify-center items-center text-md">{id ? 'Update' : 'Create'} Set</div>
				<label class="flex flex-col space-y-1 w-48">
					<div class="text-sm">Name</div>
					<input class="input input-sm w-full" bind:value={createSetDto.name} />
				</label>
				<label class="flex flex-col space-y-1 w-48">
					<div class="text-sm">Code</div>
					<input class="input input-sm w-full" bind:value={createSetDto.code} />
				</label>
				<label class="flex flex-col space-y-1 w-48">
					<div class="text-sm">Release Date</div>
					<input class="input input-sm w-full" type="month" bind:value={createSetDto.releaseDate} />
				</label>
				<label class="flex flex-col space-y-1 w-48">
					<div class="text-sm">Description</div>
					<textarea
						class="textarea textarea-bordered textarea-md"
						bind:value={createSetDto.description}
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
