<script type="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import peer from '$helpers/peer';
	import { contacts } from '$helpers/stores';
	import { afterUpdate } from 'svelte';
	import sendFiles from './sendFiles';

	let chatElement: HTMLElement;

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

		// if (e.dataTransfer?.items) {
		// 	// Use DataTransferItemList interface to access the file(s)
		// 	[...e.dataTransfer.items].forEach((item, i) => {
		// 		console.log(item);

		// 		item.getAsString((e) => console.log(e));

		// 		// If dropped items aren't files, reject them
		// 		if (item.kind === 'file') {
		// 			sendFiles(e.dataTransfer.files, $contacts[$page.params.slug]);
		// 		}
		// 	});
		// }
	};

	const handleDragOver = () => {
		console.log('File(s) in drop zone');
	};
</script>

<div
	bind:this={chatElement}
	on:drop|preventDefault={handleDrop}
	on:dragover|preventDefault={handleDragOver}
	class="h-full overflow-auto p-2"
>
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
