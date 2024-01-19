<script lang="ts">
	import Fa from 'svelte-fa';
	import type { NavbarTree } from '../classes/navbar-tree.class';
	export let navbarElement: NavbarTree = {} as NavbarTree;
	export let fn: any = () => {};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class={$$props.class} on:click={fn}>
	<Fa icon={navbarElement.icon} />
	<div class="text-md">{navbarElement.name}</div>
</div>
