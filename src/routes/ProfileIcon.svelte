<script type="ts">
	import type { Profile } from '$helpers/schema';

	export let large = false;
	export let profile: Profile;
</script>

{#if profile.picture}
	<img class="icon" class:large src={profile.picture} alt="" />
{:else}
	<span class="icon" class:large>
		<span>{profile.name.charAt(0).toUpperCase()}</span>
	</span>
{/if}

<style lang="postcss">
	.icon {
		@apply bg-neutral grid content-center text-center object-cover cursor-pointer;
		@apply h-8 w-8;
		clip-path: circle();
	}

	.large {
		@apply h-32 w-32;
		font-size: 4em;
	}
</style>
