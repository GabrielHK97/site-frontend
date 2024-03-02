<script lang="ts">
	import { DropdownOption } from '../classes/dropdown-option.class';

	export let option: DropdownOption = new DropdownOption();
</script>

<div class={$$props.class}>
	{option.label}
	<slot />
</div>
