import type { ContactMap } from './interfaces/contact';
import type { Profile } from './schema';
import { writable } from 'svelte/store';
import { localWritable } from './stores/localWritable';
import peerWritable from './stores/peerWritable';

export const theme = localWritable('theme', 'dark');

export const profile = localWritable<Profile>('profile', {
	type: 'profile',
	name: 'Anonymous',
	picture: ''
});

export const contacts = writable<ContactMap>({});

//TODO: allow user to set their peer ID
export const peer = peerWritable();
