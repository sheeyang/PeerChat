<script type="ts">
	import peer from '$helpers/peer';
	import { page } from '$app/stores';
	import { contacts } from '$helpers/stores';
	import type { FileData } from '$helpers/schema';
	import handleMessageData from '$helpers/dataHandlers/handleMessageData';

	let open = false;
	let bindFiles: FileList;

	const handleSubmit = async () => {
		console.log(bindFiles, 'instanceof', bindFiles[0] instanceof Blob);

		const file = bindFiles[0];

		const fileData: FileData = {
			type: 'filedata',
			id: peer.id,
			file: {
				name: file.name,
				type: file.type,
				size: file.size,
				arrayBuffer: await file.arrayBuffer()
			}
		};
		$contacts[$page.params.slug].conn.send(fileData satisfies FileData);

		handleMessageData(fileData, $page.params.slug);
	};
</script>

<!-- svelte-ignore missing-declaration -->
<input type="checkbox" id="add-files-modal" class="modal-toggle" bind:checked={open} />

<label for="add-files-modal" class="modal cursor-pointer">
	<label class="modal-box relative">
		<form on:submit|preventDefault={handleSubmit}>
			<h3 class="text-lg font-bold">Add Files</h3>

			<div class="form-control w-full">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">
					<span class="label-text">Pick a file</span>
				</label>
				<input bind:files={bindFiles} type="file" class="file-input file-input-bordered w-full" />
			</div>

			<div class="modal-action">
				<button type="submit" class="btn btn-sm btn-success">ADD</button>
			</div>
		</form>
	</label>
</label>
