<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Session } from '../session/session';
	import axios from 'axios';

	export let authenticate = false;

	onMount(async () => {
		authenticate = await Session.validate();
	});

	async function logout() {
		axios.defaults.baseURL = import.meta.env.VITE_API_URL;
		await axios.get('/auth/logout', { withCredentials: true });
		goto('/');
	}
</script>

<div>
	{#if authenticate}
		<div class="p-2 bg-base-300 flex justify-end items-center">
			<button class="btn btn-primary btn-sm w-24 text-neutral" on:click={logout}>Logout</button>
		</div>
	{/if}
</div>