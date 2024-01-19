<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Session } from '../session/session';
	import axios from 'axios';
	import { breadcrumb } from '../routes/hooks.client';
	import type { BreadcrumbElement } from '../components/components/breadcrumb/classes/breadcrumb.class';
	import BreadcrumbComponent from '../components/components/breadcrumb/components/breadcrumb-component.svelte';
	import BreadcrumbElementComponent from '../components/components/breadcrumb/components/breadcrumb-element-component.svelte';

	export let authenticate: boolean = false;
	export let pageName: string;
	export let allowVisualization: boolean = false;
	let currentBreadcrumb: BreadcrumbElement[] = [];

	onMount(async () => {
		authenticate = await Session.validate();
		if (!authenticate && !allowVisualization) {
			goto('/');
		}
	});

	async function logout() {
		axios.defaults.baseURL = import.meta.env.VITE_API_URL;
		await axios.get('/auth/logout', { withCredentials: true });
		goto('/');
	}

</script>

<div class="w-screen h-screen flex flex-col">
	{#if authenticate}
		<div class="p-2 bg-base-300 flex justify-end items-center">
			<div class="flex-grow">
				<BreadcrumbComponent class="flex flex-row space-x-2" breadcrumbElements={$breadcrumb} bind:pageName bind:currentBreadcrumb>
					{#each currentBreadcrumb as breadcrumbElement, i}
					<BreadcrumbElementComponent class="w-fit hover:underline" bind:currentBreadcrumb bind:breadcrumbElement bind:pageName/>
					{#if i < currentBreadcrumb.length - 1}
						<div>{'>'}</div>
					{/if}
				{/each}
				</BreadcrumbComponent>
			</div>
			<button class="btn btn-primary btn-sm w-24 text-neutral" on:click={logout}>Logout</button>
		</div>
	{/if}
	<slot/>
</div>