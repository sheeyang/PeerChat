<script type="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import peer from '$helpers/peer';
	import { contacts } from '$helpers/stores';
	import { afterUpdate } from 'svelte';

	let chatElement: HTMLElement;

	if (!$contacts[$page.params.slug]) goto('/');

	afterUpdate(() => {
		chatElement.scroll({ top: chatElement.scrollHeight, behavior: 'smooth' });
	});
</script>

<div bind:this={chatElement} class="h-full overflow-auto">
	{#each $contacts[$page.params.slug]?.messages ?? [] as msg}
		{#if msg.id === peer.id}
			<div class="chat chat-end">
				<div class="chat-bubble chat-bubble-primary">{msg.data}</div>
			</div>
		{:else}
			<div class="chat chat-start">
				<div class="chat-bubble">{msg.data}</div>
			</div>
		{/if}
	{/each}
</div>
