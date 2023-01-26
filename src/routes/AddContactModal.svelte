<script type="ts">
	import handleConnection from '$lib/handleConnection';
	import { peer } from '$lib/stores';

	let open = false;
	let bindId = '';

	const handleSubmit = () => {
		const conn = $peer.connect(bindId);
		handleConnection(conn);
		bindId = '';
		open = false;
	};
</script>

<input type="checkbox" id="add-contact-modal" class="modal-toggle" bind:checked={open} />
<!-- trick for autofocus works -->
{#if open}
	<label for="add-contact-modal" class="modal cursor-pointer">
		<label class="modal-box relative">
			<form on:submit|preventDefault={handleSubmit}>
				<h3 class="text-lg font-bold">Add Contact</h3>
				<p class="mt-4 mb-2">Contact ID:</p>
				<!-- svelte-ignore a11y-autofocus -->
				<input
					bind:value={bindId}
					type="text"
					placeholder="Type here"
					class="input input-bordered w-full"
					autofocus
				/>
				<div class="modal-action">
					<button type="submit" class="btn btn-sm btn-success">ADD</button>
				</div>
			</form>
		</label>
	</label>
{/if}
