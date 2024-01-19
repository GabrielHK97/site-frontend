<script lang="ts">
	import { goto } from '$app/navigation';
	import { SvelteComponent, onMount } from 'svelte';
	import { Session } from '../session/session';
	import axios from 'axios';
	import { breadcrumb, navbar } from '../routes/hooks.client';
	import type { BreadcrumbElement } from '../components/components/breadcrumb/classes/breadcrumb.class';
	import type { NavbarTree } from '../components/components/navbar/classes/navbar-tree.class';
	import BreadcrumbComponent from '../components/components/breadcrumb/components/breadcrumb-component.svelte';
	import BreadcrumbElementComponent from '../components/components/breadcrumb/components/breadcrumb-element-component.svelte';
	import NavbarComponent from '../components/components/navbar/components/navbar-component.svelte';
	import NavbarBodyComponent from '../components/components/navbar/components/navbar-body-component.svelte';
	import NavbarTreeComponent from '../components/components/navbar/components/navbar-tree-component.svelte';
	import NavbarElementComponent from '../components/components/navbar/components/navbar-element-component.svelte';

	export let authenticate: boolean = false;
	export let pageName: string;
	export let allowVisualization: boolean = false;

	let currentBreadcrumb: BreadcrumbElement[] = [];
	let navbarElements: NavbarTree[] = $navbar;

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
		<div class="h-12 p-2 bg-base-300 flex justify-end items-center">
			<div class="flex-grow">
				<BreadcrumbComponent
					class="flex flex-row space-x-2"
					breadcrumbElements={$breadcrumb}
					bind:pageName
					bind:currentBreadcrumb
				>
					{#each currentBreadcrumb as breadcrumbElement, i}
						<BreadcrumbElementComponent
							class="w-fit hover:underline"
							bind:currentBreadcrumb
							bind:breadcrumbElement
							bind:pageName
						/>
						{#if i < currentBreadcrumb.length - 1}
							<div>{'>'}</div>
						{/if}
					{/each}
				</BreadcrumbComponent>
			</div>
			<button class="btn btn-primary btn-sm w-24 text-neutral" on:click={logout}>Logout</button>
		</div>
	{/if}
	<div class="flex flex- row flex-grow">
		<NavbarComponent class="flex h-full w-48 min-w-[192px] flex-col items-center justify-center">
			<NavbarBodyComponent
				class="flex w-full flex-grow flex-col items-start justify-start space-y-2 p-2"
			>
				{#each navbarElements as navbarElement}
					<NavbarTreeComponent
						class="border-base-300 w-full space-y-2 border-l-2 pl-2"
						elementClass="bg-base-300 hover:border-base-content flex h-10 w-full flex-row items-center justify-start space-x-2 rounded-lg p-2 hover:border"
						bind:navbarElement
					>
						<NavbarElementComponent />
					</NavbarTreeComponent>
				{/each}
			</NavbarBodyComponent>
		</NavbarComponent>
		<slot />
	</div>
</div>
