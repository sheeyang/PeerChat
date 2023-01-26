<script lang="ts">
	import { page } from '$app/stores';
	import handleMessageData from '$helpers/dataHandlers/handleMessageData';
	import peer from '$helpers/peer';
	import type { TextMessage } from '$helpers/schema';
	import { contacts } from '$helpers/stores';
	import SendFilesModal from './SendFilesModal.svelte';

	let text = '';

	const handleSubmit = () => {
		if ($peer.id) {
			const msg: TextMessage = {
				type: 'message',
				messageType: 'text',
				id: $peer.id,
				text
			};
			$contacts[$page.params.slug].conn.send(msg satisfies TextMessage);
			handleMessageData(msg, $page.params.slug);
		}

		text = '';
	};
</script>

<div class="flex flex-col h-full">
	<SendFilesModal />
	<slot />
	<form on:submit|preventDefault={handleSubmit} class="flex border-t border-t-base-100">
		<!-- svelte-ignore a11y-autofocus -->
		<input
			bind:value={text}
			type="text"
			placeholder="Message"
			class="input input-ghost input-sm flex-auto m-1.5"
			autofocus
		/>
		<label for="send-files-modal" class="btn btn-sm btn-ghost btn-square m-1.5">
			<span class="material-symbols-rounded"> attach_file </span>
		</label>
		<button type="submit" class="btn btn-sm btn-ghost btn-square m-1.5">
			<span class="material-symbols-rounded"> send </span>
		</button>
	</form>
</div>
