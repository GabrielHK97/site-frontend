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
	import NavbarHeaderComponent from '../components/components/navbar/components/navbar-header-component.svelte';

	export let authenticated: boolean = false;
	export let allowVisualization: boolean = false;

	let currentBreadcrumb: BreadcrumbElement[] = [];
	let navbarElements: NavbarTree[] = $navbar;

	onMount(async () => {
		authenticated = await Session.validate();
		if (!authenticated && !allowVisualization) {
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
	{#if authenticated}
		<div class="flex flex-row h-full">
			<NavbarComponent class="flex flex-col w-48 h-full">
				<NavbarHeaderComponent class="w-full h-12 flex flex-col justify-center items-center">
					<div>BB</div>
				</NavbarHeaderComponent>
				<NavbarBodyComponent
					class="flex w-full flex-col space-y-2 overflow-y-auto flex-1 bg-base-300 p-2"
				>
					{#each navbarElements as navbarElement}
						<NavbarTreeComponent
							lineColor="border-primary"
							class="btn btn-primary btn-sm flex h-8 w-full flex-row items-center justify-start space-x-2 rounded-lg p-2 text-neutral text-md font-semibold"
							bind:navbarElement
						/>
					{/each}
				</NavbarBodyComponent>
			</NavbarComponent>
			<div class="flex flex-col w-full h-full">
				<div class="h-12 p-2 bg-base-300 flex justify-end items-center">
					<div class="w-full">
						<BreadcrumbComponent
							class="flex flex-row space-x-2"
							breadcrumbElements={$breadcrumb}
							bind:currentBreadcrumb
						>
							{#each currentBreadcrumb as breadcrumbElement, i}
								<BreadcrumbElementComponent
									class="w-fit hover:underline"
									bind:breadcrumbElement
								/>
								{#if i < currentBreadcrumb.length - 1}
									<div>{'>'}</div>
								{/if}
							{/each}
						</BreadcrumbComponent>
					</div>
					<button
						class="h-8 btn btn-primary btn-sm w-24 text-neutral text-md font-semibold"
						on:click={logout}
					>
						Logout
					</button>
				</div>
				<slot />
			</div>
		</div>
	{:else}
		<slot />
	{/if}
</div>
