<script type="ts">
	import { theme } from '$lib/stores';

	//TODO: choose the themes that should be in here
	const themes = [
		'light',
		'dark',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'wireframe',
		'black',
		'dracula',
		'business',
		'night',
		'coffee',
		'winter'
	];

	$: document.documentElement.setAttribute('data-theme', $theme);
</script>

<div class="dropdown dropdown-end">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label tabindex="0" class="btn btn-sm btn-square m-1 btn-ghost">
		<span class="material-symbols-rounded"> brush </span>
	</label>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul
		tabindex="0"
		class="dropdown-content menu flex-nowrap p-4 mt-5 lg:mt-4 shadow bg-base-100 rounded-box w-52 overflow-auto"
	>
		{#each themes as _theme}
			<button
				class="text-left p-2"
				on:click={() => {
					$theme = _theme;
				}}
			>
				{_theme}
			</button>
		{/each}
	</ul>
</div>

<style lang="postcss">
	ul {
		max-height: calc(100vh - 10rem);
	}
</style>
