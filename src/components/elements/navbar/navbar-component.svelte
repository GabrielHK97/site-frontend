<script lang="ts">
	import type { NavbarTree } from './classes/navbar-tree.class';
	import NavbarTreeComponent from './components/navbar-tree-component.svelte';

	export let navbarElements: NavbarTree[] = [];
</script>

<div {...$$restProps}>
	<slot name="header" />
	<div class="flex w-full flex-grow flex-col items-start justify-start space-y-2 p-2">
		{#each navbarElements as navbarElement}
			<NavbarTreeComponent bind:navbarElement />
		{/each}
	</div>
	<slot name="footer" />
</div>
