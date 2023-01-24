<script type="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import peer from '$helpers/peer';
	import { contacts } from '$helpers/stores';
	import { afterUpdate } from 'svelte';

	let chatElement: HTMLElement;

	if (!$contacts[$page.params.slug]) goto('/');
	$: console.log($contacts[$page.params.slug]);

	afterUpdate(() => {
		chatElement.scroll({ top: chatElement.scrollHeight, behavior: 'smooth' });
	});

	/**
	 * Format bytes as human-readable text.
	 * @link https://stackoverflow.com/a/14919494
	 * @param bytes Number of bytes.
	 * @param si True to use metric (SI) units, aka powers of 1000. False to use
	 *           binary (IEC), aka powers of 1024.
	 * @param dp Number of decimal places to display.
	 *
	 * @return Formatted string.
	 */
	function humanFileSize(bytes: number, si = false, dp = 1) {
		const thresh = si ? 1000 : 1024;

		if (Math.abs(bytes) < thresh) {
			return bytes + ' B';
		}

		const units = si
			? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
			: ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
		let u = -1;
		const r = 10 ** dp;

		do {
			bytes /= thresh;
			++u;
		} while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

		return bytes.toFixed(dp) + ' ' + units[u];
	}

	const isMine = (id: string) => id === peer.id;
</script>

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
