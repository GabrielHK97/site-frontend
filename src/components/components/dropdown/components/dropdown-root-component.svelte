<script lang="ts">
	import { clickout } from '../functions/use-directives.function';

	export let expanded: boolean = false;
</script>

<div
	class={$$props.class}
	use:clickout
	on:clickout={() => {
		expanded = false;
	}}
>
	<slot />
</div>
