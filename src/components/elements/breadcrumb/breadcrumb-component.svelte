<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { BreadcrumbElement } from './classes/breadcrumb-element.class';

	export let pageName: string;
	export let breadcrumbElements: BreadcrumbElement[] = [];

	let currentBreadcrumb: BreadcrumbElement[] = [];
	const fullPaths: string[] = [];

	function setFullPaths(): void {
		const pathname = window.location.pathname.split('/');
		pathname.shift();
		let p: string = '..';
		pathname.forEach((path) => {
			p = `${p}/${path}`;
			fullPaths.push(p);
		});
	}

	function setCurrentBreadcrumb(): void {
		fullPaths.forEach((path) => {
			const breadcrumbElement: BreadcrumbElement = breadcrumbElements.filter((element) => {
				return element.fullPath === path;
			})[0];
			currentBreadcrumb.push(breadcrumbElement);
		});
		pageName = currentBreadcrumb[currentBreadcrumb.length - 1]?.name;
		currentBreadcrumb = [...currentBreadcrumb];
	}

	onMount(() => {
		setFullPaths();
		setCurrentBreadcrumb();
	});
</script>

<div
	class="bg-base-100 flex h-8 w-full flex-grow flex-row items-center justify-start space-x-2 p-2 lg:h-12 lg:flex-none"
>
	{#each currentBreadcrumb as breadcrumbElement, i}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="w-fit hover:underline"
			on:click={() => {
				if (currentBreadcrumb[currentBreadcrumb.length - 1].path !== breadcrumbElement.path) goto(breadcrumbElement.fullPath);
			}}
		>
			{currentBreadcrumb[currentBreadcrumb.length - 1].path === breadcrumbElement.path
				? pageName
				: breadcrumbElement.name}
		</div>
		{#if i < currentBreadcrumb.length - 1}
			<div>{'>'}</div>
		{/if}
	{/each}
</div>
