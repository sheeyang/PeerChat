<script type="ts">
	import ProfileIcon from './ProfileIcon.svelte';
	import { profile } from '$lib/stores';
	import { ProfileSchema } from '$lib/schema';

	let open = false;
	let bindProfile = $profile;
	let pictureInput: HTMLInputElement;

	const handleSubmit = () => {
		try {
			$profile = ProfileSchema.parse({
				...$profile,
				...bindProfile
			});

			bindProfile = $profile;
			open = false;
		} catch (error) {
			console.error(error);
		}
	};
</script>

<input type="checkbox" id="profile-modal" class="modal-toggle" bind:checked={open} />
<label for="profile-modal" class="modal cursor-pointer">
	<label class="modal-box relative">
		<form on:submit|preventDefault={handleSubmit}>
			<h3 class="text-lg font-bold">Your Profile</h3>

			<button class="my-4" on:click|preventDefault={() => pictureInput.focus()}>
				<ProfileIcon large profile={bindProfile} />
			</button>

			<p class="my-4">Username:</p>
			<input bind:value={bindProfile.name} type="text" class="input input-bordered w-full" />

			<p class="my-4">Picture URL:</p>
			<input
				bind:value={bindProfile.picture}
				bind:this={pictureInput}
				type="text"
				class="input input-bordered w-full"
			/>

			<div class="modal-action">
				<button type="submit" class="btn btn-sm btn-success m-1">Update</button>
			</div>
		</form>
	</label>
</label>
