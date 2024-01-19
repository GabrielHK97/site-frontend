<script lang="ts">
	import { goto } from '$app/navigation';
	import type { BreadcrumbElement } from '../classes/breadcrumb.class';

	export let pageName: string;
	export let currentBreadcrumb: BreadcrumbElement[];
	export let breadcrumbElement: BreadcrumbElement;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={$$props.class}
	on:click={() => {
		if (currentBreadcrumb[currentBreadcrumb.length - 1].path !== breadcrumbElement.path)
			goto(breadcrumbElement.fullPath);
	}}
>
	{currentBreadcrumb[currentBreadcrumb.length - 1].path === breadcrumbElement.path
		? pageName
		: breadcrumbElement.name}
</div>
