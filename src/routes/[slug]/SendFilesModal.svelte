<script type="ts">
	import { page } from '$app/stores';
	import { contacts } from '$helpers/stores';
	import sendFiles from './sendFiles';

	let open = false;
	let bindFiles: FileList;
</script>

<input type="checkbox" id="send-files-modal" class="modal-toggle" bind:checked={open} />

<label for="send-files-modal" class="modal cursor-pointer">
	<label class="modal-box relative">
		<form on:submit|preventDefault={() => sendFiles(bindFiles, $contacts[$page.params.slug])}>
			<h3 class="text-lg font-bold">Send Files</h3>

			<div class="form-control w-full">
				<div class="label">
					<span class="label-text">Pick a file</span>
				</div>
				<input bind:files={bindFiles} type="file" class="file-input file-input-bordered w-full" />
			</div>

			<div class="modal-action">
				<button type="submit" class="btn btn-sm btn-success">Send</button>
			</div>
		</form>
	</label>
</label>
