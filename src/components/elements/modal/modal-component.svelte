<script lang="ts">
	import CardComponent from '../card/card-component.svelte';
	import { clickout } from '../dropdown/functions/use-directives.function';

	export function open(): void {
		show = true;
	}

	export function close(): void {
		show = false;
	}

	let show = false;
</script>

<div
	class="{show ? 'absolute' : 'hidden'} flex h-full w-full items-center justify-center"
	style="background-color:#191D245e; z-index: 2"
>
	<div use:clickout on:clickout={close}>
		<slot />
	</div>
</div>
