<script type="ts">
	import '../app.postcss';
	import handleConnection from '$helpers/handleConnection';
	import peer from '$helpers/peer';
	import AddContactModal from './AddContactModal.svelte';
	import { profile, contacts } from '$helpers/stores';
	import ProfileModal from './ProfileModal.svelte';
	import ProfileIcon from './ProfileIcon.svelte';
	import copyTextToClipboard from '$helpers/copyTextToClipboard';
	import { goto } from '$app/navigation';
	import { dev } from '$app/environment';
	import Peer from 'peerjs';

	// $peer = new Peer('sdfdsfsdf');
	// $peer = new Peer('sdfdsfsfsdfddsdf');
	// $peer = new Peer('sdfdsfsddsfdsfdsfdsfsdff');

	let showCopiedText = false;

	if (!dev)
		// prevent reload in production
		window.onbeforeunload = () => {
			return '';
		};

	/**
	 * Runs when the tab or browser is closed
	 * this might not work on mobile
	 * See: https://developer.mozilla.org/en-US/docs/Web/API/Window/pagehide_event#usage_notes
	 */
	window.onpagehide = () => {
		try {
			$peer.destroy();
		} catch (error) {
			console.error(error);
		}
	};

	const handleCopy = () => {
		copyTextToClipboard($peer.id);
		showCopiedText = true;
		setTimeout(() => {
			showCopiedText = false;
		}, 1500);
	};
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0"
/>

<main data-theme="dark" class="absolute inset-0 flex flex-col">
	<AddContactModal />

	<ProfileModal />

	<!-- Header -->
	<div class="navbar min-h-fit">
		<!-- Left side -->
		<div class="flex-1 gap-2">
			<!-- TODO: highlight the selected contact -->
			<!-- Contacts drawer -->
			<label for="contacts-drawer" class="flex-none lg:hidden btn btn-square btn-ghost">
				<!-- prettier-ignore -->
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current" ><path 	stroke-linecap="round" 	stroke-linejoin="round" 	stroke-width="2" 	d="M4 6h16M4 12h16M4 18h16" /></svg>
			</label>
			<!-- Peer ID -->
			<span>Your ID:</span>
			<button on:click={handleCopy} class="h-full text-info tooltip tooltip-bottom" data-tip="Copy"
				>{$peer.id}
			</button>
			<span class:hidden={!showCopiedText} class="transition-all ease-in-out duration-100 px-2"
				>Copied
			</span>
		</div>

		<!-- Right side -->
		<div class="flex-none gap-2">
			<label for="add-contact-modal" class="btn btn-sm btn-square btn-success">+</label>
			<label for="profile-modal">
				<ProfileIcon profile={$profile} />
			</label>
		</div>
	</div>

	<div class="drawer drawer-mobile">
		<input id="contacts-drawer" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content flex-auto bg-base-300 h-full">
			<!-- Chat -->
			<slot />
		</div>
		<div class="drawer-side">
			<label for="contacts-drawer" class="drawer-overlay" />
			<div class="menu lg:w-80 bg-base-200 text-base-content">
				<!-- Contacts -->
				{#each Object.entries($contacts) as [id, contact]}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<label
						on:click={() => {
							goto(id);
						}}
						for="contacts-drawer"
						class="flex bg-base-200 hover:brightness-95 cursor-pointer"
					>
						<div class="grid items-center p-2 mt-0.5">
							<ProfileIcon profile={contact.profile} />
						</div>
						<div class="m-1">
							<p>{contact.profile.name}</p>
							<p class="text-xs text-accent">{id}</p>
						</div>
					</label>
				{/each}
			</div>
		</div>
	</div>
</main>
