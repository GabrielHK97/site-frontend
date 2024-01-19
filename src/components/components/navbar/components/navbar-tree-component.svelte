<script lang="ts">
	import type { NavbarTree } from '../classes/navbar-tree.class';
	import { goto } from '$app/navigation';
	import NavbarElementComponent from './navbar-element-component.svelte';

	export let navbarElement: NavbarTree;
	export let elementClass: string;

	function expandOrRedirect() {
		if (navbarElement.elements.length > 0) {
			navbarElement.expanded = !navbarElement.expanded;
		} else {
			goto(navbarElement.fullPath);
		}
	}
</script>

<NavbarElementComponent
	class={elementClass}
	bind:navbarElement
	fn={() => {
		expandOrRedirect();
	}}
/>

{#if navbarElement.expanded}
	<div class="w-full pl-2">
		<ul class={$$props.class}>
			{#each navbarElement.elements as element}
				<li class="flex">
					{#if navbarElement.elements.length > 0}
						<svelte:self class={$$props.class} navbarElement={element} {elementClass} />
					{:else}
						<NavbarElementComponent
							class={elementClass}
							bind:navbarElement
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
