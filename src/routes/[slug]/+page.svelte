<script type="ts">
	import { afterUpdate } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { peer } from '$lib/stores';
	import { contacts } from '$lib/stores';
	import sendFiles from './sendFiles';

	let chatElement: HTMLElement;
	let showDropOverlay = false;

	if (!$contacts[$page.params.slug]) goto('/');

	afterUpdate(() => {
		chatElement.scroll({ top: chatElement.scrollHeight, behavior: 'smooth' });
	});

	/**
	 * @description Format bytes as human-readable text.
	 * @link https://stackoverflow.com/a/20732091
	 */
	const humanFileSize = (size: number) => {
		var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
		return parseInt((size / Math.pow(1024, i)).toFixed(2)) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
	};

	const isMine = (id: string) => id === $peer.id;

	const handleDrop = (e: DragEvent) => {
		if (e.dataTransfer?.files) {
			sendFiles(e.dataTransfer.files, $contacts[$page.params.slug]);
		}
		showDropOverlay = false;
	};
</script>

<div
	class="flex flex-col h-full relative min-h-0"
	on:dragover|preventDefault
	on:dragenter|preventDefault={(e) => {
		if (e.dataTransfer?.types[0] === 'Files') showDropOverlay = true;
	}}
>
	<div
		on:drop|preventDefault={handleDrop}
		on:dragleave|preventDefault={() => {
			showDropOverlay = false;
		}}
		class="h-full w-full absolute z-50 bg-opacity-10 bg-black grid items-center text-center text-4xl select-none"
		class:hidden={!showDropOverlay}
	>
		Drop files here
	</div>

	<div bind:this={chatElement} class="h-full overflow-auto p-2">
		{#each $contacts[$page.params.slug]?.messages ?? [] as msg}
			{#if msg.messageType === 'text'}
				<div class="chat {isMine(msg.id) ? 'chat-end' : 'chat-start'}">
					<div class="chat-bubble" class:chat-bubble-primary={isMine(msg.id)}>{msg.text}</div>
				</div>
			{:else if msg.messageType === 'file'}
				<div class="chat {isMine(msg.id) ? 'chat-end' : 'chat-start'}">
					<a
						href={msg.file.url}
						download={msg.file.name}
						class="chat-bubble w-fit flex gap-3"
						class:chat-bubble-primary={isMine(msg.id)}
					>
						<div class="grid items-center">
							<span class="material-symbols-rounded"> draft </span>
						</div>
						<div class="form-control w-full">
							<span>{msg.file.name}</span>
							<span class="text-[0.7rem]">{humanFileSize(msg.file.size)}</span>
						</div>
					</a>
				</div>
			{/if}
		{/each}
	</div>
</div>
