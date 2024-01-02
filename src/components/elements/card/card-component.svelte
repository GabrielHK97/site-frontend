<script lang="ts">
	export let name: string = '';
</script>

<div
	class="flex h-fit min-h-0 flex-col items-center justify-center space-y-2 rounded-lg {$$props.class}"
>
	{#if name}
		<div class="flex h-10 items-center justify-center p-2 text-xl">{name}</div>
	{/if}
	{#if $$slots.content}
		<div class="flex h-full min-h-0 w-full flex-col items-center justify-center pl-2 pr-2">
			<slot name="content" />
		</div>
	{/if}
	{#if $$slots.footer}
		<div class="flex h-fit w-full flex-row items-center justify-center p-2">
			<slot name="footer" />
		</div>
	{/if}
</div>
