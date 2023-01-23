import { writable } from 'svelte/store';
import type { ContactMap, Profile } from './schema';
import peer from './peer';
import { localWritable } from './lib/localWritable';

export const profile = localWritable<Profile>('profile', {
	type: 'profile',
	name: 'Anonymous',
	id: peer.id,
	picture: ''
});

export const contacts = writable<ContactMap>({});
