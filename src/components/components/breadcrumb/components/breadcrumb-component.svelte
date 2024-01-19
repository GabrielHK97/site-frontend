<script lang="ts">
	import { onMount } from 'svelte';
	import type { BreadcrumbElement } from '../classes/breadcrumb.class';

	export let pageName: string;
	export let currentBreadcrumb: BreadcrumbElement[] = [];
	export let breadcrumbElements: BreadcrumbElement[];

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

<div class={$$props.class}>
	<slot />
</div>
