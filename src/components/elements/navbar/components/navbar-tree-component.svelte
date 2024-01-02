<script lang="ts">
	import { goto } from '$app/navigation';
	import type { NavbarTree } from '../classes/navbar-tree.class';
	import NavbarElementComponent from './navbar-element-component.svelte';

	export let navbarElement: NavbarTree;

	function expandOrRedirect() {
		if (navbarElement.elements.length > 0) {
			navbarElement.expanded = !navbarElement.expanded;
		} else {
			goto(navbarElement.fullPath);
		}
	}
</script>

<NavbarElementComponent
	{navbarElement}
	fn={() => {
		expandOrRedirect();
	}}
/>

{#if navbarElement.expanded}
	<div class="w-full pl-2">
		<ul class="border-base-300 w-full space-y-2 border-l-2 pl-2">
			{#each navbarElement.elements as element}
				<li class="flex">
					{#if navbarElement.elements.length > 0}
						<svelte:self navbarElement={element} />
					{:else}
						<NavbarElementComponent
							{navbarElement}
							fn={() => {
								expandOrRedirect();
							}}
						/>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
{/if}
