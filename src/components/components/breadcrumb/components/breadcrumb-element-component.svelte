<script lang="ts">
	import { goto } from '$app/navigation';
	import type { BreadcrumbElement } from '../classes/breadcrumb.class';

	export let breadcrumbElement: BreadcrumbElement;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={$$props.class}
	on:click={() => {
		goto(breadcrumbElement.fullPath);
	}}
>
	{breadcrumbElement.name}
</div>
