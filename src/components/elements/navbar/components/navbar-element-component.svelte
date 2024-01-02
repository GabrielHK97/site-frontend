<script lang="ts">
	//import Fa from 'svelte-fa/src/fa.svelte';
	import type { NavbarTree } from '../classes/navbar-tree.class';
	export let navbarElement: NavbarTree;
	export let fn: any;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="bg-base-300 hover:border-base-content flex h-10 w-full flex-row items-center justify-start space-x-2 rounded-lg p-2 hover:border"
	on:click={fn}
>
	<!--<Fa icon={navbarElement.icon} />-->
	<div class="text-md">{navbarElement.name}</div>
</div>
