<script type="ts">
	import '../app.postcss';
	import { profile } from '$helpers/stores';
	import { ProfileSchema } from '$helpers/schema';
	import ProfileIcon from './ProfileIcon.svelte';

	let open = false;
	let bindProfile = $profile;

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

			{#if bindProfile.picture}
				<img class="icon" src={bindProfile.picture} alt="" />
			{:else}
				<span class="icon">
					<span class="pb-2">{bindProfile.name.charAt(0).toUpperCase()}</span>
				</span>
			{/if}

			<p class="mt-4 mb-2">Username:</p>
			<input bind:value={bindProfile.name} type="text" class="input input-bordered w-full" />

			<p class="mt-4 mb-2">Picture URL:</p>
			<input bind:value={bindProfile.picture} type="text" class="input input-bordered w-full" />

			<div class="modal-action">
				<button type="submit" class="btn btn-sm btn-success m-1">Update</button>
			</div>
		</form>
	</label>
</label>

<style lang="postcss">
	.icon {
		@apply bg-neutral grid content-center text-center object-cover cursor-pointer;
		@apply h-32 w-32 my-6;
		clip-path: circle();
		font-size: 5em;
	}
</style>
