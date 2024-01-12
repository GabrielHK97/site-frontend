<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Session } from '../session/session';
	import NavbarComponent from '../components/elements/navbar/navbar-component.svelte';
	import { breadcrumb, navbar } from '../hooks.client';
	import BreadcrumbComponent from '../components/elements/breadcrumb/breadcrumb-component.svelte';

	export let pageName: string = '';

	onMount(async () => {
		if (!(await Session.validate())) {
			goto('/');
		}
	});

	function signOut() {
		goto('/');
	}
</script>

<div class="flex h-screen min-h-screen w-screen flex-row items-center justify-center">
	<NavbarComponent
		class="flex h-full w-48 min-w-[192px] flex-col items-center justify-center"
		navbarElements={$navbar}
	>
		<div slot="footer" class="flex w-full items-center justify-center p-2">
			<button class="btn btn-sm btn-primary h-10 text-xs lg:w-full" on:click={signOut}
				>sign out</button
			>
		</div>
	</NavbarComponent>
	<div class="bg-base-100 flex h-full w-full flex-col">
		<div class="border-base-300 border lg:hidden" />
		<BreadcrumbComponent bind:pageName breadcrumbElements={$breadcrumb} />
		<div
			class=" bg-neutral flex h-full min-h-0 w-full flex-col items-center justify-start space-y-2 p-0 lg:p-2"
		>
			<slot />
		</div>
	</div>
</div>
