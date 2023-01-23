<script lang="ts">
	import { page } from '$app/stores';
	import peer from '$helpers/peer';
	import type { Message } from '$helpers/schema';
	import { contacts } from '$helpers/stores';

	let text = '';

	const handleSubmit = () => {
		if (peer.id) {
			const msg: Message = {
				type: 'message',
				id: peer.id,
				data: text
			};
			$contacts[$page.params.slug].conn.send(msg);
			$contacts[$page.params.slug].messages = [...$contacts[$page.params.slug].messages, msg];
		}

		text = '';
	};
</script>

<div class="flex flex-col h-full">
	<slot />
	<form on:submit|preventDefault={handleSubmit} class="flex">
		<!-- svelte-ignore a11y-autofocus -->
		<input
			bind:value={text}
			type="text"
			placeholder="Type here"
			class="input input-bordered input-sm flex-auto m-1"
			autofocus
		/>
		<button type="submit" class="btn btn-sm m-1">SEND</button>
	</form>
</div>
