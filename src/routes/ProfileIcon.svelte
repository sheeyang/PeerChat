<script type="ts">
	import type { Profile } from '$lib/schema';

	export let large = false;
	export let profile: Profile;
</script>

{#if profile.picture}
	<img class="btn btn-circle btn-sm" class:large src={profile.picture} alt="" />
{:else}
	<span class="btn btn-circle btn-sm" class:large>
		<span>{profile.name.charAt(0).toUpperCase()}</span>
	</span>
{/if}

<style lang="postcss">
	.large {
		@apply h-32 w-32;
		font-size: 4em;
	}
</style>
